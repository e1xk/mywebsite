# 🍩 DonutCraft — Minecraft Texture Packs

A community "bakery" concept site for Minecraft texture packs, built with plain
HTML / CSS / JavaScript — no frameworks, no build step.

![DonutCraft logo](assets/logo.png)

**Live site:** once GitHub Pages is enabled, this README's repo serves the site
directly from `index.html`.

## Features

- 🍩 Hero with animated sprinkles, counters and a scrolling style ticker
- 🔍 Pack shelf with live search, category chips and sorting (12 sample packs)
- 🎨 Procedural pixel-art thumbnails drawn on `<canvas>` from each pack's palette
- 📦 Pack detail modal with simulated download progress + toast notifications
- ♥ Favorites persisted in `localStorage`
- 📱 Responsive down to phones, `prefers-reduced-motion` respected

## Run locally

Just open `index.html` in a browser — or serve the folder:

```powershell
powershell -File server.ps1   # http://127.0.0.1:8765/
```

> Fan-made concept site. Not an official Minecraft product; not approved by or
> associated with Mojang or Microsoft.
