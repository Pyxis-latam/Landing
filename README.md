# Pyxis Landing Page

Landing page for Pyxis, a group with two divisions:

- **Pyxis Labs** — recomposes existing companies: makes them more efficient and
  more powerful without growing or shrinking them. Pilot: a 100+ person retailer
  in Chile; next verticals are the retail niche, then furniture and construction.
- **Pyxis Ventures** — builds companies that run without people. The first is
  **Hermes**, the "Zero Man Wholesaler": a distributor of inks, cartridges and
  printers piloting in Chile and expanding country by country.

## Page structure

`app/page.tsx` composes, in order: `Header` → `Hero` (umbrella statement) →
`SocialProof` → `Divisions` (two cards linking to `#labs` / `#ventures`) →
`Labs` (recomposition steps + growth timeline by vertical) → `Ventures` (Hermes
intro + pillars) → `GlobeExpansion` (Hermes country map) → `Team` → `FinalCta` →
`Footer`. All copy, in Spanish and English, lives in `lib/i18n/dictionary.ts`.
`components/ui/StepGrid.tsx` and `components/ui/PhaseTimeline.tsx` are the
shared primitives for the three-column steps and the animated timeline.

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

Type: `Geist` (display and body), `Instrument Serif` italic for the one accented
phrase in each headline (`components/ui/Emphasis.tsx`) and `Geist Mono` for the
small labels. All three load through `next/font/google` in `app/layout.tsx`.

- `components/PyxisCompass.tsx` — the animated Pyxis mark: a brass dial with a
  settling north needle and the four stars of Pyxis (the constellation of the
  mariner's compass). Below 48px it thickens its strokes and drops the
  constellation lines; `app/icon.tsx` and `app/opengraph-image.tsx` carry static
  versions of the same mark.
- `components/PageBackdrop.tsx` — fixed layer behind the whole page: three
  drifting nebula clouds (CSS, `app/globals.css`) plus the starfield.
- `components/ParticleField.tsx` — DPR-aware starfield with depth: near stars are
  larger, brighter, drift faster and parallax against the scroll; rare shooting
  stars.
- `components/Comet.tsx` — a comet that occasionally streaks across the hero.
- `components/ui/SpotlightCard.tsx` — the glass panel used by the division and
  team cards: hairline border, top light catch and a brass spotlight that
  follows the cursor.
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
