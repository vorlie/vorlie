---
title: "Implementing Word-Level Lyrics Sync (and Why My First Karaoke Animation Flickered)"
date: "2026-11-17"
tags: ["electron", "react", "typescript", "css", "lyrics", "iotaplayer"]
excerpt: "Adding word-by-word lyrics synchronization to IotaPlayer meant dealing with two incompatible timing formats, Polish punctuation, and a subtle CSS transition flicker."
---

Line-synchronized lyrics are nice, right up until you listen to a fast track and find yourself squinting at a four-second line trying to guess which word is actually being sung.

In **IotaPlayer**, I already had standard `.lrc` parsing, embedded `SYLT`/`USLT` support, and a basic Lyricsfile YAML loader.

At some point I asked myself:

> What if the lyrics highlighted word-by-word instead of just jumping line-by-line?

On paper, that sounded like a weekend UI feature. In practice, it turned into a tour through spec compliance, whitespace edge cases, and why throwing 60fps React updates at `background-clip: text` is a great way to make text vanish.

## First, the formats don't agree on anything

IotaPlayer supports a few different ways to attach lyrics to a track:

```text
Lyrics sources
├── Embedded tags (ID3v2 SYLT / USLT, Vorbis LYRICS)
├── .lyricsfile.yaml (Lyricsfile 1.0)
├── .lrc (standard or Enhanced LRC <mm:ss.xx>)
└── .txt (plain fallback)
```

Previously, choosing between them was mostly filename-based. If a `.lyricsfile.yaml` existed next to an `.lrc` file, it won automatically—even if the YAML file only had plain text and the `.lrc` file was actually synchronized.

So the first step was ranking candidates by **actual parsed sync quality**:

```text
word  >  line  >  none
```

Only when two sources tie on sync quality does the resolution fall back to format preference (`Lyricsfile` → `LRC` → `Embedded` → `Plain`).

## The whitespace trap between Lyricsfile 1.0 and Enhanced LRC

Once both parsers produced `line.words` arrays, I ran into a subtle difference in how the two formats treat spaces.

In **Lyricsfile 1.0**, concatenating every `word.text` is required to reconstruct the parent line's text character-for-character. That means spaces live *inside* the word tokens:

```yaml
- text: "Stay until the morning"
  words:
    - text: "Stay "
      start_ms: 4200
      end_ms: 4800
    - text: "until "
      start_ms: 4800
      end_ms: 5400
```

In **Enhanced LRC**, inline timestamps sit between words (`<00:10.00> Never <00:10.50> gonna`), so the parser trims each segment cleanly:

```text
"Never", "gonna", "give", "you", "up"
```

To make the renderer handle both formats without duplicating components, I checked whether the line's words already carried their own spaces (`words.some(w => /\s/.test(w.text))`). If they didn't, the UI inserted spaces between tokens.

That worked fine on English test tracks. Then I tested a Polish rap track with dashes inside the lyrics:

```text
<01:12.67> Nie <01:12.92> jestem <01:13.46> zdrowy - <01:14.78> to <01:15.02> moje <01:15.44> wybory
```

Half the lines rendered with no spaces between words (`Niejestemzdrowy -tomojewybory`).

Because `"zdrowy -"` had an **internal** space before the dash, `/\s/.test("zdrowy -")` returned `true` for the whole line—convincing the renderer that every token already had trailing whitespace.

Changing the check to only look for leading or trailing whitespace fixed it immediately:

```ts
const hasEmbeddedSpaces = words
  ? words.some((w) => /^\s|\s$/.test(w.text))
  : false
const hasLineSpaces = words ? /\s/.test(line.text) : false

// Inside word mapping:
const needsTrailingSpace =
  /\s$/.test(word.text) ||
  (!hasEmbeddedSpaces && hasLineSpaces && wIdx < words.length - 1)
```

## Then came the 60fps karaoke flicker

With parsing sorted out, I wanted the active word to fill smoothly from left to right as it was sung—even for 150ms syllables that happen between backend playback position ticks.

My first implementation did three things at once:

1. A `requestAnimationFrame` hook interpolated playback position and updated React state at 60fps.
2. Each active word used `-webkit-background-clip: text` with `color: transparent` and a `linear-gradient` driven by `--word-progress`.
3. Active and past words had a soft `drop-shadow` / `text-shadow` glow.

It looked great in a screenshot, and felt awful in motion.

The glow lagged behind fast lyrics, and worse—the text itself **flickered** every time a word finished.

### Why it was actually flickering

Looking closely at the CSS revealed two problems compounding each other:

1. **The `transparent` transition flash**: `.lyric-word` had `transition: color 120ms ease`. When a word switched from `.is-active` (`color: transparent`, `background-clip: text`) to `.is-past` (`color: var(--color-accent)`), the gradient background disappeared instantly—while the text color spent 120ms interpolating *from `rgba(0, 0, 0, 0)`* to the accent color. Every word briefly disappeared right after being sung.
2. **Offscreen filter thrashing**: Updating `--word-progress` and `drop-shadow()` at 60fps forced Chromium to re-rasterize GPU filter layers on every frame, while React re-rendered the entire lyrics view 60 times a second even when nothing changed.

## The fix: boundary-driven updates and solid glyphs

Instead of brute-forcing 60fps React renders, I changed the interpolation hook (`useInterpolatedPosition`) to do something much simpler:

```text
requestAnimationFrame (60fps)
  │
  ├── compute monotonic position (clamped with highWaterMark)
  ├── check active line index & active word index
  │
  └── line or word changed?
        ├── NO  → do nothing (0 React renders)
        └── YES → update state (1 render on exact word boundary)
```

You still get sub-16ms timing accuracy for fast syllables, without re-rendering the component tree 60 times per second. And because the position tracks a monotonic high-water mark (only resetting on an explicit seek), minor jitter from MPV or IPC polling can't bounce a word backward:

```ts
const tick = (now: number) => {
  const anchor = anchorRef.current
  const elapsedSeconds = Math.max(0, (now - anchor.timestamp) / 1000)
  const rawNext = anchor.position + Math.min(0.5, elapsedSeconds)
  const monotonicNext = Math.max(anchor.highWaterMark, rawNext)
  const clampedNext = duration > 0 ? Math.min(duration, monotonicNext) : monotonicNext
  anchor.highWaterMark = clampedNext

  const lineIdx = getActiveLyricIndex(lyrics, clampedNext)
  const line = lineIdx >= 0 ? lyrics.lines[lineIdx] : null
  const nextLineTs = lineIdx >= 0 ? lyrics.lines[lineIdx + 1]?.timestamp : undefined
  const wordIdx = line ? getActiveWordIndex(line, clampedNext, nextLineTs) : -1

  if (lineIdx !== anchor.lastLineIdx || wordIdx !== anchor.lastWordIdx) {
    anchor.lastLineIdx = lineIdx
    anchor.lastWordIdx = wordIdx
    setSyncPosition(clampedNext)
  }

  frameId = window.requestAnimationFrame(tick)
}
```

On the CSS side, I stripped out `drop-shadow`, `background-clip: text`, and `color: transparent` on word-synced lines, replacing them with direct solid `color` transitions between dimmed upcoming words and the accent color:

```css
.lyric-word {
  display: inline;
  border-radius: 3px;
  transition: color 90ms ease;
}

.lyric-line.is-active.is-word-synced .lyric-word.is-past,
.lyric-line.is-active.is-word-synced .lyric-word.is-active {
  color: var(--color-accent);
}

.lyric-line.is-active.is-word-synced .lyric-word.is-upcoming {
  color: rgba(237, 228, 228, 0.38);
}
```

The result is much calmer on the eyes, uses a fraction of the GPU/CPU time, and doesn't lose a single frame on fast verses.
