# Adding Your Pictures & Videos to TRIO

## How it works today

Every image/video slot on the site reads from one file: `src/content/trio.ts`.
Each placeholder looks like this:

```ts
heroMedia: placeholder("OFFICIAL KEY ART", "TRIO official key art"),
```

A placeholder has an empty `src`. As soon as a slot has a real `src`, the site automatically shows your image instead of the gray placeholder block. No design changes needed.

## The 3 steps to add any media

1. **Upload the file into the project.** I do this for you — just attach the image or video in chat and tell me where it goes (e.g. "this is the hero key art" or "add these 5 to Behind TRIO"). Files are hosted on fast CDN storage and organized in folders:
   - `public/images/posters` — key art, film poster, teaser poster
   - `public/images/characters` — the three portraits
   - `public/images/bts` — behind-the-scenes frames
   - `public/images/world` — Dominor, Act 138A, D6 card, The Three
   - `public/video` — any video files

2. **I update `src/content/trio.ts`** so the matching slot points at your file. Example:

   ```ts
   heroMedia: { src: heroAsset.url, alt: "TRIO official key art", label: "OFFICIAL KEY ART" },
   ```

3. **The placeholder disappears** and your media shows in the correct cinematic treatment everywhere it is used.

## Specific swaps you can ask for

- **Hero image or video** — one line in `trio.ts` (`heroMedia`). Video can be added with autoplay/muted/loop behavior.
- **Teaser/trailer** — if it's on YouTube or Vimeo, just paste the link; I set `film.teaserUrl` and the WATCH TEASER button + modal start playing it instantly. No file upload needed.
- **Character portraits** — the three `people` entries under `characters`.
- **BTS gallery** — send any number of photos; I'll add them to `behind.images` and they appear in the gallery + lightbox automatically.
- **World cards** — four image slots under `world.cards`.

## Tips for best results

- Landscape (16:9 or wider) for hero and story stills; portrait (2:3 or 3:4) for character portraits.
- JPG for photos (smaller files); MP4/WebM for video.
- High resolution is fine — I optimize on upload.

## Ready when you are

Attach your first assets in chat (up to 10 files per message, 20MB each) or paste a YouTube/Vimeo teaser link, and I'll wire them in.
