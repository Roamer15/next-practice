---
title: "A Practical Guide to Core Web Vitals"
date: "2026-09-15"
excerpt: "LCP, INP, and CLS are the metrics Google actually measures. Here's what each one means and how to move the needle on it."
---

Core Web Vitals are the set of metrics Google uses to judge real-world page experience, and they factor into search ranking. Unlike synthetic scores that only exist in a lab, these are measured from actual visitors, which makes them harder to game and more useful to optimize for.

There are three of them.

## Largest Contentful Paint (LCP)

LCP measures how long it takes for the largest visible element — usually a hero image, a heading, or a large block of text — to render on screen. Google considers anything under 2.5 seconds "good."

The most common causes of a slow LCP:

- A render-blocking resource (large CSS or JS files) delaying first paint.
- The LCP image being loaded lazily when it shouldn't be — it's above the fold, so it should load eagerly.
- Slow server response times pushing back when the browser can even start rendering.

Fixes that usually move this metric:

```html
<!-- Preload the LCP image instead of discovering it late -->
<link rel="preload" as="image" href="/hero.jpg" fetchpriority="high" />
```

```html
<!-- Make sure the LCP image itself isn't lazy-loaded -->
<img src="/hero.jpg" loading="eager" fetchpriority="high" alt="..." />
```

Reducing server response time (TTFB) and eliminating render-blocking `<script>` tags in the `<head>` also pays off directly, since nothing can paint until the browser has parsed enough to know what to render.

## Interaction to Next Paint (INP)

INP replaced First Input Delay as the responsiveness metric. It measures the latency of every interaction across the whole page lifecycle — not just the first one — and reports something close to the worst-case experience a user actually had. Good is under 200ms.

INP gets worse when the main thread is busy when a user clicks, taps, or types. Common culprits:

- Long JavaScript tasks that block the main thread (anything over 50ms is a "long task").
- Expensive event handlers doing synchronous work — large state updates, unbatched re-renders, heavy DOM reads/writes interleaved.
- Third-party scripts (analytics, ads, chat widgets) competing for the main thread at the exact moment a user interacts.

Breaking up long tasks helps directly:

```js
// Instead of one long synchronous loop that blocks input:
items.forEach(processItem);

// Yield back to the main thread between chunks:
async function processInChunks(items) {
  for (let i = 0; i < items.length; i += 50) {
    const chunk = items.slice(i, i + 50);
    chunk.forEach(processItem);
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}
```

## Cumulative Layout Shift (CLS)

CLS measures visual stability — how much visible content shifts around unexpectedly during the page's lifetime. Good is under 0.1.

The usual offenders are predictable once you know to look for them:

- Images and embeds without explicit `width`/`height` (or `aspect-ratio`), so the browser doesn't reserve space before the resource loads.
- Web fonts swapping in and reflowing text (mitigate with `font-display: optional` or by matching fallback font metrics).
- Content — banners, cookie notices, ads — injected above existing content after the initial render.

```css
img, video {
  aspect-ratio: attr(width) / attr(height);
  /* or explicit width/height attributes on the element itself */
}
```

Reserving space up front, even with a plain placeholder `div`, is almost always cheaper than trying to fix the shift after the fact.

## Measuring instead of guessing

Lab tools like Lighthouse are useful for catching regressions in CI, but they measure a single simulated run under fixed conditions. Field data — from the Chrome UX Report or your own real-user monitoring — is what actually determines your Core Web Vitals score, because it reflects the real distribution of devices, networks, and page states your users hit. Treat lab scores as a leading indicator and field data as the source of truth.
