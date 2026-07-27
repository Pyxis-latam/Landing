# Pyxis Landing Page

Landing page for Pyxis — we transform wholesaler companies into 0-person operations.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Tests

```bash
npm test
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, click **New Project** and import the repository.
3. Framework Preset is auto-detected as **Next.js** — no configuration needed.
4. Click **Deploy**.

The page is fully static (no environment variables, no API routes, no database) —
the primary call to action is a `mailto:pyxis.latam@gmail.com` link, so there is
nothing to configure beyond connecting the repo.

## Team photos and bios

Founder photos live in `public/team/` (`vicente.jpg`, `felipe.jpg`) and are
rendered with `next/image` in `components/Team.tsx`. To replace a photo, drop a
new file with the same name.

Clicking a founder's name expands a card with their bio and experience. That
copy lives in `lib/i18n/dictionary.ts` under `team.members[*].bio` and
`team.members[*].experiences`. The `experiences` entries are placeholders marked
with a `// TODO` comment — replace them with the real roles from each LinkedIn
profile (LinkedIn blocks automated scraping, so this step is manual).

## Space / constellation theme

- `components/PyxisCompass.tsx` — the animated Pyxis compass shown next to the
  wordmark (Pyxis is the constellation of the mariner's compass).
- `components/Comet.tsx` — a comet that periodically streaks across the hero.
- `components/ParticleField.tsx` — starfield with twinkling stars and occasional
  shooting stars.
- `components/GlobeExpansion.tsx` — a full-screen, photorealistic 3D night globe
  (three.js + WebGL) that spins from Chile → Mexico → Brazil & Paraguay when you
  press the arrows. It shows vector **country borders** (the focused country is
  highlighted in gold) and **callout labels** (a line linking each country to a
  name card) that track the country as the globe rotates. Assets live in
  `public/globe/`: `earth-night.jpg` (4096×2048 NASA Black Marble, via the
  three-globe example assets) and `countries.geojson` (Natural Earth 110m).
  Framing/rotation are tuned via the constants at the top of the component
  (`FOV`, `CAMERA_Z`, `GLOBE_Y`, …); label offsets live in the `ANN` array. It
  falls back gracefully (no crash) where WebGL is unavailable.

All animations respect `prefers-reduced-motion`.
