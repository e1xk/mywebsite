# 🍩 DonutCraft — Minecraft Texture Packs

A community "bakery" concept site for Minecraft texture packs, built with plain
HTML / CSS / JavaScript — no frameworks, no build step. Every listed pack is a
real `.zip` hosted right here and downloadable in one click.

![DonutCraft logo](assets/logo.png)

## Features

- 📦 20 real resource packs served directly from `packs/*.zip`
- 🎨 Thumbnails are the actual `pack.png` icons extracted from each zip
- 🏷️ Metadata (description, pack format, texture resolution) parsed from each
  pack's `pack.mcmeta` and PNG headers — no hand-typed data
- 🔍 Live search, category chips, sorting, favorites (saved in `localStorage`)
- 🍩 Hero with animated sprinkles, counters and a scrolling ticker
- 📱 Responsive down to phones, `prefers-reduced-motion` respected

## Adding a pack

1. Drop the `.zip` into `packs/`
2. Run the generator:
   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File build_packs.ps1
   ```
3. Commit and push — GitHub Pages redeploys automatically

The generator reads from `C:\Users\zachw\Downloads\resourcepacks\` by default;
edit `$zips = ...` at the bottom of the scan section to change the source.

## Run locally

Just open `index.html` in a browser — or serve the folder:

```powershell
powershell -File server.ps1   # http://127.0.0.1:8765/
```

> Fan-made concept site. Not an official Minecraft product; not approved by or
> associated with Mojang or Microsoft.
