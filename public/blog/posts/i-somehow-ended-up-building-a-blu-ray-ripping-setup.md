---
title: "I Somehow Ended Up Building a Blu-ray Ripping Setup"
date: "2026-08-25"
tags: ["blu-ray", "dvd", "plex", "makemkv", "media", "self-hosting"]
excerpt: "A small rabbit hole involving old laptops, cheap DVD collections, Blu-ray drives, MakeMKV and Plex."
---

I already had a perfectly good way to watch Blu-rays.

My Xbox One can play them just fine, and I already own a few movies on Blu-ray. In fact, I have the complete eight-disc Harry Potter collection, so there isn't really a problem with playing physical media.

But at some point I started thinking:

> What if I just ripped my movies and put them in Plex?

And, as usual, a simple idea turned into a small rabbit hole.

## I already had two DVD drives

I have two working slim laptop DVD drives sitting around.

One came from an old **Compaq Presario CQ60**, and the other came from a different laptop. I also already had a small **Slim SATA to USB adapter board**, originally intended for use with PS3 drives.

So the basic setup was already there:

```text
PC
 │
 USB
 │
 Slim SATA → USB adapter
 │
 ├── DVD drive #1
 ├── DVD drive #2
 └── Blu-ray drive (eventually?)
```

The only thing missing was a Blu-ray drive.

And that's where old laptops became interesting.

## The surprisingly cheap Blu-ray drive

I found an old **HP Pavilion dv5-1060ew** listed for around **85 PLN**.

The laptop itself wasn't particularly interesting to me. It's an old machine, and there is a good chance that it's completely dead or useful only for parts.

What caught my attention was the optical drive.

The dv5-1060ew was sold with a **Sony/Optiarc BC-5500S** Blu-ray combo drive.

That was exactly what I was looking for.

The interesting part is that another seller was offering the same type of drive separately for around **80 PLN**.

So for roughly the same money, I could either buy:

* just the Blu-ray drive, or
* an entire old laptop that might contain the same drive.

At that point the decision was pretty obvious.

If I can get the laptop shipped or convince the seller to hold it for me, I can just remove the optical drive and recycle the rest.

Basically:

> **85 PLN for a Blu-ray drive, with a free dead laptop attached.**

## What the BC-5500S actually does

The **Optiarc BC-5500S** is a Blu-ray reader combined with a DVD/CD writer.

It can read:

* Blu-ray
* DVD
* CD

and it can write DVDs and CDs, but it **does not burn Blu-ray discs**.

That's completely fine for what I want.

I'm interested in reading my existing movies and creating digital copies, not writing new Blu-ray discs.

The drive also makes sense for older physical media in general. If I find an old DVD movie for a few złoty, I can just rip it and add it to my library.

## Why DVD is actually pretty interesting

This is probably the part I didn't expect.

Blu-rays are obviously better if you care about image quality, but DVDs are **really cheap**.

You can sometimes find older movies for just a few złoty, especially used copies.

And if the goal is simply to have the movie available in Plex, a DVD can still be a perfectly reasonable source.

For example, I already have a DVD copy of **WALL-E**.

### What actually came off the DVD?

One thing I like about MakeMKV is that the resulting MKV gives me a pretty good look at what was actually stored on the disc.

The main video stream is:

```text
Video: MPEG-2 Main
Resolution: 720x576
Pixel aspect ratio: 64:45
Display aspect ratio: 16:9
Frame rate: 25 fps
Average bitrate: ~5.45 Mbps
```

The video is anamorphic, using a pixel aspect ratio of `64:45`, so the 720×576 frame is displayed as 16:9.

The movie is **01:33:20.640** long, and the MKV retains the original **32 chapter** structure from the disc.

The full file has an average bitrate of around **7.6 Mbps**.

The video stream itself is about **3.82 GB**:

```text
NUMBER_OF_BYTES-eng: 3817527972
```

And, most importantly, this isn't a re-encoded copy.

MakeMKV extracted the original MPEG-2 stream from the DVD and placed it into an MKV container.

### There is quite a bit of audio too

The DVD contains five AC-3 5.1 tracks, all at **384 kbps**:

```text
English
Czech
Hungarian
Polish
Slovak
```

There is also an English stereo track at **192 kbps**.

So even though this is "just a DVD", there is actually quite a bit of audio on the disc.

The 5.1 tracks are all:

```text
AC-3
48 kHz
5.1 channels
384 kbps
```

MakeMKV doesn't need to re-encode them either. The original AC-3 streams can simply be copied into the MKV.

That means I can keep the original surround audio exactly as it was stored on the disc.

### Subtitles and chapters

The disc also contains a surprisingly large number of DVD subtitle streams.

My rip contains subtitle tracks in:

* English
* Czech
* Hungarian
* Polish
* Slovak

There are also different subtitle variants, which explains why there are more subtitle streams than just one per language.

The chapters are preserved too:

```text
WALL-E.mkv
├── MPEG-2 video — 720x576 PAL
├── AC-3 5.1 — English
├── AC-3 5.1 — Czech
├── AC-3 5.1 — Hungarian
├── AC-3 5.1 — Polish
├── AC-3 5.1 — Slovak
├── AC-3 stereo — English
├── DVD subtitles
└── 32 chapters
```

So the resulting file isn't really a "converted DVD".

It's much closer to the original disc contents, just packaged into a container that's much easier to work with.

For an old DVD, that's honestly pretty neat.

And it also made me realize that **DVDs aren't necessarily a bad source for a Plex library**, especially when they're cheap and the movie isn't something I particularly need in HD.

## And then I found a Blu-ray version

While looking at a higher-quality version of WALL-E, I found a 1080p encode with:

```text
1920x800
23.98 fps
H.264
Duration: 01:38:12
```

At first, I thought:

> "Perfect. I'll just take the better video and keep the AC-3 5.1 audio from my DVD."

Except it wasn't quite that simple.

The DVD is PAL and runs at 25 fps, while the Blu-ray source runs at approximately 23.976 fps.

That means the DVD version is effectively sped up compared to the Blu-ray.

I compared the same scene near the end of the movie:

```text
Blu-ray: ~01:20:50
DVD:     ~01:17:30
```

The difference wasn't a simple constant offset.

It changes throughout the movie.

So I couldn't just shift the DVD audio by a few minutes and call it a day.

I'd need to time-stretch the audio and make sure the two versions actually match.

I could do that, but at some point I stopped and thought:

> Why am I doing all this?

If I want the Blu-ray quality, I can just buy the Blu-ray.


## Just buy the disc

This ended up being the conclusion of my WALL-E experiment.

Instead of trying to combine:

```text
Blu-ray video
+
DVD audio
+
PAL → 23.976 timing conversion
+
subtitle synchronization
```

I can simply buy the Blu-ray and make my own proper Blu-ray rip.

That gives me the original video, the original audio tracks and the original subtitles from the same release.

No synchronization experiments required.

And I can still keep the DVD rip as a separate source.

## Blu-ray gets interesting when you look at the audio

My Harry Potter collection is probably the best example.

The first disc alone contains audio tracks in a ridiculous number of languages:

* English
* Polish
* Czech
* Greek
* Hebrew
* Hungarian
* Icelandic
* Russian
* Slovak
* Thai
* Turkish

And that's just the audio.

There are also multiple subtitle tracks and all the other content included on the discs.

This is one of the reasons I like the idea of using MakeMKV and keeping the original streams.

Instead of converting everything into a single H.265 video with one audio track, I can preserve the parts of the disc that I actually care about.

For example:

```text
Harry Potter 01.mkv
├── 1080p video
├── English audio
├── Polish audio
├── Other audio tracks
├── Polish subtitles
├── English subtitles
└── Other subtitles
```

I don't necessarily need every single track for everyday Plex use, but having the original disc means I can always go back and extract whatever I need.

## Physical media + Plex

This is probably the setup I want in the end.

The physical discs remain my original source:

```text
Blu-ray / DVD
       │
       ▼
    MakeMKV
       │
       ▼
      MKV
       │
       ▼
      Plex
```

I get the convenience of streaming from Plex without giving up the physical media.

If a hard drive dies, I still have the discs.

If I want to watch something without getting up and finding the right disc, it's already in the library.

And if I find a better release later, I can replace the digital copy without losing the original.

## Cheap DVDs are still worth considering

I'm also starting to look at DVDs differently.

For example, I found a **five-film Pirates of the Caribbean DVD collection** for around **82 PLN**.

That's roughly:

```text
82 PLN / 5 ≈ 16.50 PLN per movie
```

A five-film Blu-ray collection of the same series costs considerably more.

If the DVD release has the audio and subtitles I want, that's a perfectly reasonable way to get five movies into my library.

And if one of them becomes a movie I really care about, I can always buy the Blu-ray later.

So I don't really see DVD and Blu-ray as competing formats anymore.

They're more like two different tiers:

> **DVD for cheap additions to the library.**
> **Blu-ray for movies I really care about.**

## The setup I'm aiming for

Eventually, the hardware will be pretty simple.

I already have:

* a PC
* two working slim DVD drives
* a Slim SATA -> USB adapter
* an Xbox One for playing physical Blu-rays

The missing piece is a cheap slim Blu-ray drive.

If I manage to get the old HP Pavilion with the BC-5500S, I'll remove the drive, connect it through the USB adapter and see if it actually works.

If it does, I'll essentially have a cheap external Blu-ray drive made from old laptop hardware.

And that's honestly the fun part.

I didn't really set out to build a ripping setup in the first place.

I just wanted an easy way to put my movies in Plex.

Somehow, that turned into looking for old laptops with Blu-ray drives, comparing DVD and Blu-ray releases, figuring out PAL speed-up, looking into audio remuxing, and eventually considering building a small physical media library.

All because I thought:

> "It would be nice to have my movies in Plex."

Classic tech rabbit hole.


---

### The plan

For now, the plan is pretty simple:

1. Get a cheap working Blu-ray drive.
2. Test it with my existing Blu-rays.
3. Use MakeMKV for lossless remuxes.
4. Keep the original discs.
5. Add the digital copies to Plex.
6. Pick up cheap DVDs when I find something interesting.
7. Upgrade favourite movies to Blu-ray when it makes sense.

Nothing particularly complicated.

Just a nice excuse to give some old hardware a second life.
