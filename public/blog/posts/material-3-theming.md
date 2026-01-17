---
title: "Building a Dynamic Material 3 Theme System"
date: "2026-01-17"
tags: ["webdev", "material-design", "tutorial"]
excerpt: "How I implemented Material You theming that extracts colors from my wallpaper and applies them across the entire website."
---

# Building a Dynamic Material 3 Theme System

One of the coolest features of my website is the **dynamic theming system**. The entire color palette changes based on the dominant color of my background wallpaper. Here's how I built it.

## The Problem

I wanted my website to feel cohesive with my desktop environment. Since I change my wallpaper frequently, hardcoding colors wasn't an option.

## The Solution: Material You

Google's Material You design system provides tools to generate entire color palettes from a single source color. Perfect!

### Step 1: Extract the Dominant Color

I used `colorthief` to extract the dominant color from an image:

```typescript
import ColorThief from "colorthief";

const img = new Image();
img.src = "/images/background.png";

img.onload = () => {
  const colorThief = new ColorThief();
  const [r, g, b] = colorThief.getColor(img);
  // Now we have RGB values!
};
```

### Step 2: Generate Material 3 Palette

Using `@material/material-color-utilities`, I generated a complete dark theme:

```typescript
import { argbFromRgb, themeFromSourceColor, hexFromArgb } from "@material/material-color-utilities";

const sourceColor = argbFromRgb(r, g, b);
const theme = themeFromSourceColor(sourceColor);
const darkScheme = theme.schemes.dark;
```

### Step 3: Apply to CSS Variables

Finally, I mapped the generated colors to CSS custom properties:

```typescript
const root = document.documentElement;
root.style.setProperty("--color-m3-primary", hexFromArgb(darkScheme.primary));
root.style.setProperty("--color-m3-surface", hexFromArgb(darkScheme.surface));
// ... and so on
```

## The Result

Now every time I change my website background, the entire website adapts automatically. Everything from buttons to cards to accent colors shifts to match the new palette.

You can check out the `/colors` page to see the current theme in action!

## Want to Learn More?

Check out the [source code](https://github.com/vorlie/vorlie) or read the [Material Design docs](https://m3.material.io/).
