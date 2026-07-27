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

## Adding real founder photos

The team section currently shows initials avatars for Vicente Pareja and Felipe
Carvallo. To use real photos: drop image files into `public/team/`, then swap the
initials `<span>` in `components/Team.tsx` for a `next/image` pointing at the new
files.
