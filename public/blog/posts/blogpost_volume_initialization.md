---
title: "Fixing Startup Volume Spikes Across MPV and Web Audio in Electron"
date: "2026-11-17"
tags: ["electron", "mpv", "web-audio", "typescript", "audio", "iotaplayer"]
excerpt: "How async initialization races between settings hydration, an MPV IPC socket, and HTMLAudioElement caused cold-launch volume blasts—and how a single volume coordinator fixed it."
---

There is no faster way to wake yourself up at 2 AM than launching your own music player, hitting play, and getting blasted at 100% volume even though you left the slider at 20% yesterday.

That was the exact bug I ran into with **IotaPlayer**.

The volume slider in the UI would show the right number, or briefly jump, while the audio itself came out way too loud on cold launch—especially when using the browser audio fallback.

## Why IotaPlayer has two audio backends

IotaPlayer uses **MPV** as its primary playback engine, spawned as a headless child process and controlled over a local IPC pipe (`\\.\pipe\iotaplayer-mpv-<pid>` on Windows, or a Unix domain socket on Linux/macOS).

MPV handles FLAC, gapless playback, and odd codecs effortlessly.

Alongside it, there is a **Browser / Web Audio** fallback built on `HTMLAudioElement` and `AudioContext`—both as a safety net when `mpv` isn't on `PATH`, and to power the 10-band equalizer and real-time spectrum visualizer.

```text
UI / Zustand Store
       │
       ├──► MPV Backend (child process + JSON IPC socket)
       │
       └──► Browser Backend (HTMLAudioElement + Web Audio API)
```

Having two backends is great for compatibility. Having two backends that initialize asynchronously at startup is a recipe for race conditions.

## What was actually happening on cold launch

When you trace startup from the moment the Electron window opens to the first audible sample, four things happen concurrently:

1. **Settings load asynchronously** from disk (`userData/settings.json`).
2. **React/Zustand initializes** with a default volume (`0.8`) before hydration finishes.
3. **MPV spawns and connects** to its IPC socket (which can take a few hundred milliseconds with retries).
4. **The browser `HTMLAudioElement`** is created with the browser's default `element.volume = 1.0`.

If you started playing a track before step 1 finished, or before step 3 connected, one of three things happened:

* The `HTMLAudioElement` played at its default `1.0` (100%) until the next store sync.
* MPV spawned at its default volume and ignored early `set_property` calls made while the socket was still connecting.
* Even worse: if you dragged the volume slider *during* startup, the delayed settings hydration could finish a moment later and overwrite your new volume with the old saved value.

## Centralizing the state in `VolumeController`

Instead of patching `setVolume()` calls in three different places, I moved the lifecycle into a dedicated coordinator (`electron/volume.ts`) with explicit rules for hydration, user overrides, and backend readiness.

The key states are simple:

* `hydrated`: has the persisted volume been loaded from disk yet?
* `userModified`: did the user change the slider *before* hydration finished?

If `userModified` is `true` when `hydrate(persistedValue)` finally resolves, the stale persisted value is ignored so it never clobbers an intentional user adjustment:

```ts
public hydrate(persistedValue: unknown): number {
  this.hydrated = true
  if (!this.userModified && persistedValue !== undefined && persistedValue !== null) {
    this.volume = normalizeVolume(persistedValue, this.volume)
    this.applyToAudioElement()
    void this.options.applyMpvVolume?.(this.volume)
    this.options.onVolumeApplied?.(this.volume)
  }
  return this.volume
}
```

```text
Cold launch
  ├── Load persisted volume ──► userModified? ──► YES: keep user's value
  │                                           └── NO:  apply persisted value
  │
  └── Start playback ──► await ensureHydrated() ──► apply volume BEFORE audio starts
```

## Making MPV and `HTMLAudioElement` obey it

Once the logical `0..1` volume was deterministic, both backends just needed to respect it before producing sound:

* **MPV (`electron/mpv.ts`)**: Instead of spawning `mpv` at its default volume and trying to lower it over IPC afterward, the process now spawns directly with `--volume` already set:

```ts
const args = [
  '--idle=yes',
  '--no-video',
  '--no-terminal',
  `--input-ipc-server=${this.pipePath}`,
  '--keep-open=yes',
  '--gapless-audio=yes',
  `--volume=${toMpvVolume(this.currentVolume)}`,
]
```

Any volume change requested while the IPC socket is still connecting updates `this.currentVolume` immediately and is applied as soon as the socket opens.
* **Browser Audio**: Whenever the `HTMLAudioElement` is created or recreated, `VolumeController` sets `element.volume = this.volume` synchronously before any `play()` call is allowed through.

## The takeaway

Most volume bugs in desktop media players aren't math bugs—they're **ordering bugs**. If a backend can emit a single buffer of audio before your persisted settings have resolved, eventually a user will hit play during that 150ms window and get hit with 100% volume.

Making playback `await ensureHydrated()` and passing the initial volume at process spawn eliminated the spike completely across both engines.
