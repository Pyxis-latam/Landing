# Pyxis Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, bilingual (ES default / EN toggle), animated marketing landing page for Pyxis, deployable to Vercel with zero configuration.

**Architecture:** Next.js App Router (TypeScript) with a client-side language context driving all copy from a typed dictionary, Tailwind CSS v4 for styling via CSS-first `@theme` tokens, and Framer Motion for scroll-reveal and SVG line-draw animations. The page is fully static — the only "backend" interaction is `mailto:` links — so it deploys to Vercel by simply connecting the GitHub repo.

**Tech Stack:** Next.js (App Router, TypeScript), Tailwind CSS v4, Framer Motion, Jest + React Testing Library (via `next/jest`).

## Global Constraints

- Default language is Spanish; an English toggle switches all copy client-side without changing the URL (no `/en`, `/es` routing).
- Primary CTA action is `mailto:pyxis.latam@gmail.com` — no contact-form backend, no third-party form service, no API routes, no environment variables.
- No real metrics/numbers about pilot customers — all social-proof copy stays qualitative.
- Colors: background `#050505`, foreground `#F2F1EE`, accent `#D9A54D`, panel `#12141A` — use these exact hex values.
- No 3D/WebGL libraries — animation is Framer Motion + Canvas 2D + CSS only.
- All non-essential animation must respect `prefers-reduced-motion: reduce`.
- Founders: Vicente Pareja (CEO, https://www.linkedin.com/in/vicentepareja/) and Felipe Carvallo Lancellotti (Chief Deployment Officer, https://www.linkedin.com/in/felipe-carvallo-lancellotti-228615276/?locale=en).
- Contact email: `pyxis.latam@gmail.com`.
- No investor/partner logos, no blog, no legal pages, no detailed careers page — single page only.

---

### Task 1: Project scaffolding + test infrastructure

**Files:**
- Create: entire Next.js project via `create-next-app` (package.json, tsconfig.json, next.config.ts, app/layout.tsx, app/page.tsx, app/globals.css, public/, .gitignore, eslint config)
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Modify: `package.json` (add `test` script)
- Modify: `app/page.tsx` (replace boilerplate with a minimal placeholder)
- Test: `app/page.test.tsx`

**Interfaces:**
- Produces: a Next.js App Router project rooted at the repo root (no `src/` dir), with import alias `@/*` → `./*`; a working `npm test` command via Jest + React Testing Library + jsdom, with global mocks for `IntersectionObserver`, `window.matchMedia`, `HTMLCanvasElement.prototype.getContext`, `requestAnimationFrame`/`cancelAnimationFrame` available to every later test.

- [ ] **Step 1: Scaffold the Next.js project**

Run from the `landing` directory (it already contains `.git` and `docs/`, both of which `create-next-app` allows in a non-empty directory):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

If it prompts interactively for anything not covered by these flags, accept the default shown (press Enter).

- [ ] **Step 2: Verify the scaffold builds**

Run: `npm run build`
Expected: build completes with exit code 0.

- [ ] **Step 3: Install runtime and test dependencies**

```bash
npm install framer-motion
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-node @types/jest
```

- [ ] **Step 4: Add Jest configuration**

Create `jest.config.ts`:

```ts
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEach: undefined,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
```

Create `jest.setup.ts`:

```ts
import "@testing-library/jest-dom";

class IntersectionObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  fillRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;

global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(() => callback(Date.now()), 0) as unknown as number;
};

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};
```

Add to `package.json` `"scripts"`:

```json
"test": "jest"
```

- [ ] **Step 5: Replace the default boilerplate homepage**

Replace the full contents of `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Pyxis</h1>
    </main>
  );
}
```

- [ ] **Step 6: Write the smoke test**

Create `app/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import Home from "./page";

it("renders the homepage placeholder", () => {
  render(<Home />);
  expect(screen.getByText("Pyxis")).toBeInTheDocument();
});
```

- [ ] **Step 7: Run the test suite**

Run: `npm test`
Expected: 1 passed, 1 total.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Jest + RTL test infrastructure"
```

---

### Task 2: i18n dictionary + language context

**Files:**
- Create: `lib/i18n/dictionary.ts`
- Create: `lib/i18n/LanguageContext.tsx`
- Test: `lib/i18n/LanguageContext.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `dictionaries` object and `Lang`/`Dictionary` types from `lib/i18n/dictionary.ts`; `LanguageProvider` component and `useLanguage()` hook from `lib/i18n/LanguageContext.tsx`, where `useLanguage()` returns `{ lang: Lang; t: Dictionary; toggleLang: () => void }`. Every later component reads copy exclusively through `useLanguage().t`.

- [ ] **Step 1: Write the dictionary**

Create `lib/i18n/dictionary.ts`:

```ts
export const dictionaries = {
  es: {
    nav: {
      problem: "Problema",
      howItWorks: "Cómo funciona",
      vision: "Visión",
      team: "Equipo",
    },
    cta: {
      talk: "Hablemos",
    },
    hero: {
      eyebrow: "PYXIS",
      headlinePre: "Transformamos wholesalers en operaciones de",
      headlineEmphasis: "cero personas",
      subheadline:
        "Identificamos los cuellos de botella de tu operación y construimos los agentes e integraciones que los eliminan para siempre.",
      cta: "Hablemos",
    },
    socialProof: {
      text: "Ya en operación con wholesalers piloto en Latinoamérica.",
    },
    problem: {
      eyebrow: "01 — El problema",
      headlinePre: "Cada wholesaler esconde",
      headlineEmphasis: "un cuello de botella",
      body: "Compras, inventario, precios y logística dependen de procesos manuales que no escalan. Cada tarea repetitiva es una hora que no vuelve a crecer el negocio.",
    },
    howItWorks: {
      eyebrow: "02 — Cómo funciona",
      headlinePre: "Un camino claro hacia la",
      headlineEmphasis: "autonomía operativa",
      steps: [
        {
          number: "01",
          title: "Detectamos",
          body: "Mapeamos tu operación completa y encontramos los cuellos de botella que te están frenando.",
        },
        {
          number: "02",
          title: "Construimos",
          body: "Diseñamos integraciones y agentes a medida que automatizan esos procesos de punta a punta.",
        },
        {
          number: "03",
          title: "Multiplicamos",
          body: "Cada trabajador rinde por diez. La operación empieza a correr sola.",
        },
      ],
    },
    vision: {
      eyebrow: "03 — La visión",
      headlinePre: "Rumbo a la",
      headlineEmphasis: "operación autónoma",
      phases: [
        {
          label: "Fase 1",
          title: "Piloto",
          body: "Wholesalers seleccionados operando con nuestras primeras integraciones y agentes.",
        },
        {
          label: "Fase 2",
          title: "Expansión",
          body: "Llevamos el sistema a toda la operación del wholesaler y a nuevas industrias en la región.",
        },
        {
          label: "Fase 3",
          title: "Cero personas",
          body: "El wholesaler opera de forma completamente autónoma, guiado por agentes de punta a punta.",
        },
      ],
    },
    team: {
      eyebrow: "Equipo",
      headlinePre: "Construido por",
      headlineEmphasis: "operadores",
      members: [
        {
          name: "Vicente Pareja",
          role: "CEO",
          linkedin: "https://www.linkedin.com/in/vicentepareja/",
          initials: "VP",
        },
        {
          name: "Felipe Carvallo Lancellotti",
          role: "Chief Deployment Officer",
          linkedin:
            "https://www.linkedin.com/in/felipe-carvallo-lancellotti-228615276/?locale=en",
          initials: "FC",
        },
      ],
    },
    finalCta: {
      headlinePre: "El futuro del wholesaler es",
      headlineEmphasis: "autónomo",
      body: "Hablemos de cómo Pyxis puede transformar tu operación.",
      cta: "Hablemos",
    },
    footer: {
      email: "pyxis.latam@gmail.com",
      copyright: "Pyxis. Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      problem: "Problem",
      howItWorks: "How it works",
      vision: "Vision",
      team: "Team",
    },
    cta: {
      talk: "Let's talk",
    },
    hero: {
      eyebrow: "PYXIS",
      headlinePre: "We turn wholesalers into",
      headlineEmphasis: "zero-person operations",
      subheadline:
        "We find the bottlenecks in your operation and build the agents and integrations that remove them for good.",
      cta: "Let's talk",
    },
    socialProof: {
      text: "Already live with pilot wholesalers across Latin America.",
    },
    problem: {
      eyebrow: "01 — The problem",
      headlinePre: "Every wholesaler is hiding",
      headlineEmphasis: "a bottleneck",
      body: "Purchasing, inventory, pricing and logistics all depend on manual processes that don't scale. Every repetitive task is an hour that never grows the business again.",
    },
    howItWorks: {
      eyebrow: "02 — How it works",
      headlinePre: "A clear path to",
      headlineEmphasis: "operational autonomy",
      steps: [
        {
          number: "01",
          title: "Detect",
          body: "We map your entire operation and find the bottlenecks holding you back.",
        },
        {
          number: "02",
          title: "Build",
          body: "We design custom integrations and agents that automate those processes end to end.",
        },
        {
          number: "03",
          title: "Multiply",
          body: "Every worker performs like ten. The operation starts running on its own.",
        },
      ],
    },
    vision: {
      eyebrow: "03 — The vision",
      headlinePre: "Bound for",
      headlineEmphasis: "autonomous operation",
      phases: [
        {
          label: "Phase 1",
          title: "Pilot",
          body: "Selected wholesalers running our first integrations and agents.",
        },
        {
          label: "Phase 2",
          title: "Expansion",
          body: "We roll the system out across the full operation and into new industries in the region.",
        },
        {
          label: "Phase 3",
          title: "Zero people",
          body: "The wholesaler runs fully autonomously, guided end to end by agents.",
        },
      ],
    },
    team: {
      eyebrow: "Team",
      headlinePre: "Built by",
      headlineEmphasis: "operators",
      members: [
        {
          name: "Vicente Pareja",
          role: "CEO",
          linkedin: "https://www.linkedin.com/in/vicentepareja/",
          initials: "VP",
        },
        {
          name: "Felipe Carvallo Lancellotti",
          role: "Chief Deployment Officer",
          linkedin:
            "https://www.linkedin.com/in/felipe-carvallo-lancellotti-228615276/?locale=en",
          initials: "FC",
        },
      ],
    },
    finalCta: {
      headlinePre: "The future of wholesale is",
      headlineEmphasis: "autonomous",
      body: "Let's talk about how Pyxis can transform your operation.",
      cta: "Let's talk",
    },
    footer: {
      email: "pyxis.latam@gmail.com",
      copyright: "Pyxis. All rights reserved.",
    },
  },
} as const;

export type Lang = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Lang];
```

- [ ] **Step 2: Write the failing test for the language context**

Create `lib/i18n/LanguageContext.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider, useLanguage } from "./LanguageContext";

function Probe() {
  const { lang, t, toggleLang } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="headline">{t.hero.headlineEmphasis}</span>
      <button onClick={toggleLang}>toggle</button>
    </div>
  );
}

describe("LanguageContext", () => {
  it("defaults to Spanish", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
    expect(screen.getByTestId("headline")).toHaveTextContent("cero personas");
  });

  it("toggles to English and back", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );

    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("headline")).toHaveTextContent(
      "zero-person operations"
    );

    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- LanguageContext`
Expected: FAIL — `./LanguageContext` module not found.

- [ ] **Step 4: Implement the language context**

Create `lib/i18n/LanguageContext.tsx`:

```tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { dictionaries, type Lang, type Dictionary } from "./dictionary";

type LanguageContextValue = {
  lang: Lang;
  t: Dictionary;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- LanguageContext`
Expected: PASS, 2 passed.

- [ ] **Step 6: Commit**

```bash
git add lib/i18n
git commit -m "feat: add i18n dictionary and language context"
```

---

### Task 3: Design tokens and global styles

**Files:**
- Modify: `app/globals.css`
- Test: `app/design-tokens.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: Tailwind utility classes `bg-pyxis-bg`, `text-pyxis-fg`, `text-pyxis-accent`, `bg-pyxis-accent`, `bg-pyxis-panel`, `border-pyxis-fg/10` (and similar opacity variants), `font-display`, `font-mono-label`, available to every component task from here on. A global `prefers-reduced-motion: reduce` rule and a subtle noise-grain overlay on `body`.

- [ ] **Step 1: Write the failing test**

Create `app/design-tokens.test.ts`:

```ts
import { readFileSync } from "fs";
import path from "path";

describe("design tokens", () => {
  it("defines the Pyxis color palette and reduced-motion rule in globals.css", () => {
    const css = readFileSync(
      path.join(process.cwd(), "app/globals.css"),
      "utf-8"
    );
    expect(css).toContain("--color-pyxis-bg: #050505");
    expect(css).toContain("--color-pyxis-fg: #f2f1ee");
    expect(css).toContain("--color-pyxis-accent: #d9a54d");
    expect(css).toContain("--color-pyxis-panel: #12141a");
    expect(css).toContain("prefers-reduced-motion");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- design-tokens`
Expected: FAIL — assertions don't match the default create-next-app globals.css.

- [ ] **Step 3: Replace globals.css with the Pyxis design tokens**

Replace the full contents of `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-pyxis-bg: #050505;
  --color-pyxis-fg: #f2f1ee;
  --color-pyxis-accent: #d9a54d;
  --color-pyxis-panel: #12141a;
  --font-display: var(--font-display), ui-sans-serif, system-ui, sans-serif;
  --font-mono-label: var(--font-mono-label), ui-monospace, monospace;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

body {
  position: relative;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 40;
  opacity: 0.035;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- design-tokens`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/design-tokens.test.ts
git commit -m "feat: add Pyxis design tokens and reduced-motion base styles"
```

---

### Task 4: UI primitives (SectionEyebrow, RevealOnScroll, Emphasis, MailtoButton, LanguageToggle)

**Files:**
- Create: `components/ui/SectionEyebrow.tsx`
- Create: `components/ui/RevealOnScroll.tsx`
- Create: `components/ui/Emphasis.tsx`
- Create: `components/ui/MailtoButton.tsx`
- Create: `components/ui/LanguageToggle.tsx`
- Test: `components/ui/SectionEyebrow.test.tsx`
- Test: `components/ui/RevealOnScroll.test.tsx`
- Test: `components/ui/Emphasis.test.tsx`
- Test: `components/ui/MailtoButton.test.tsx`
- Test: `components/ui/LanguageToggle.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()` and `LanguageProvider` from `@/lib/i18n/LanguageContext` (Task 2).
- Produces: `SectionEyebrow({ children: string })`, `RevealOnScroll({ children: ReactNode; delay?: number })`, `Emphasis({ children: ReactNode })` (accent-colored blur-to-sharp reveal, replaces plain `<em>` everywhere), `MailtoButton({ email: string; label: string; subject?: string })`, `LanguageToggle()` — all consumed by every section component in later tasks. Both `RevealOnScroll` and `Emphasis` respect `prefers-reduced-motion` via Framer Motion's `useReducedMotion()` hook (the global CSS reduced-motion rule from Task 3 only covers CSS transitions/animations, not Framer Motion's JS-driven ones).

- [ ] **Step 1: Write the failing tests**

Create `components/ui/SectionEyebrow.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { SectionEyebrow } from "./SectionEyebrow";

it("renders its label text", () => {
  render(<SectionEyebrow>01 — El problema</SectionEyebrow>);
  expect(screen.getByText("01 — El problema")).toBeInTheDocument();
});
```

Create `components/ui/RevealOnScroll.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { RevealOnScroll } from "./RevealOnScroll";

describe("RevealOnScroll", () => {
  it("renders its children", () => {
    render(
      <RevealOnScroll>
        <p>Hello</p>
      </RevealOnScroll>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("still renders its children when reduced motion is preferred", () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })) as unknown as typeof window.matchMedia;

    render(
      <RevealOnScroll>
        <p>Reduced</p>
      </RevealOnScroll>
    );
    expect(screen.getByText("Reduced")).toBeInTheDocument();
  });
});
```

Create `components/ui/Emphasis.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Emphasis } from "./Emphasis";

it("renders its emphasized text", () => {
  render(<Emphasis>cero personas</Emphasis>);
  expect(screen.getByText("cero personas")).toBeInTheDocument();
});
```

Create `components/ui/MailtoButton.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { MailtoButton } from "./MailtoButton";

describe("MailtoButton", () => {
  it("renders a plain mailto link without a subject", () => {
    render(<MailtoButton email="pyxis.latam@gmail.com" label="Hablemos" />);
    expect(screen.getByText("Hablemos")).toHaveAttribute(
      "href",
      "mailto:pyxis.latam@gmail.com"
    );
  });

  it("encodes the subject when provided", () => {
    render(
      <MailtoButton
        email="pyxis.latam@gmail.com"
        label="Hablemos"
        subject="Hola Pyxis"
      />
    );
    expect(screen.getByText("Hablemos")).toHaveAttribute(
      "href",
      "mailto:pyxis.latam@gmail.com?subject=Hola%20Pyxis"
    );
  });
});
```

Create `components/ui/LanguageToggle.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

it("shows the target language and toggles on click", async () => {
  const user = userEvent.setup();
  render(
    <LanguageProvider>
      <LanguageToggle />
    </LanguageProvider>
  );

  const button = screen.getByRole("button", { name: /toggle language/i });
  expect(button).toHaveTextContent("EN");

  await user.click(button);
  expect(button).toHaveTextContent("ES");
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- components/ui`
Expected: FAIL — none of the five modules exist yet.

- [ ] **Step 3: Implement the primitives**

Create `components/ui/SectionEyebrow.tsx`:

```tsx
export function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="font-mono-label text-xs uppercase tracking-[0.2em] text-pyxis-accent">
      {children}
    </p>
  );
}
```

Create `components/ui/RevealOnScroll.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function RevealOnScroll({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

Create `components/ui/Emphasis.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Emphasis({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.em
      className="text-pyxis-accent"
      initial={shouldReduceMotion ? false : { opacity: 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.em>
  );
}
```

Create `components/ui/MailtoButton.tsx`:

```tsx
type MailtoButtonProps = {
  email: string;
  label: string;
  subject?: string;
};

export function MailtoButton({ email, label, subject }: MailtoButtonProps) {
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;

  return (
    <a
      href={href}
      className="inline-block rounded-full bg-pyxis-accent px-6 py-3 text-sm font-semibold text-pyxis-bg transition-transform hover:scale-105 hover:brightness-110"
    >
      {label}
    </a>
  );
}
```

Create `components/ui/LanguageToggle.tsx`:

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Toggle language"
      className="font-mono-label text-xs tracking-widest text-pyxis-fg/70 hover:text-pyxis-accent"
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- components/ui`
Expected: PASS, 7 passed.

- [ ] **Step 5: Commit**

```bash
git add components/ui
git commit -m "feat: add SectionEyebrow, RevealOnScroll, Emphasis, MailtoButton, LanguageToggle primitives"
```

---

### Task 5: Particle field background

**Files:**
- Create: `components/ParticleField.tsx`
- Test: `components/ParticleField.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks (uses `window.matchMedia`, canvas — both mocked by `jest.setup.ts` from Task 1).
- Produces: `ParticleField()` component rendering a `<canvas data-testid="particle-field">` that fills its positioned parent, consumed by `Hero` in Task 7.

- [ ] **Step 1: Write the failing tests**

Create `components/ParticleField.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { ParticleField } from "./ParticleField";

describe("ParticleField", () => {
  it("renders a canvas element", () => {
    render(<ParticleField />);
    expect(screen.getByTestId("particle-field")).toBeInTheDocument();
  });

  it("does not schedule further frames when reduced motion is preferred", () => {
    const rafSpy = jest.spyOn(window, "requestAnimationFrame");
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })) as unknown as typeof window.matchMedia;

    render(<ParticleField />);
    expect(rafSpy).not.toHaveBeenCalled();
    rafSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- ParticleField`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the particle field**

Create `components/ParticleField.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  driftX: number;
  driftY: number;
  twinkleSpeed: number;
  twinkleOffset: number;
};

const PARTICLE_COUNT = 80;

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.2 + 0.3,
    driftX: (Math.random() - 0.5) * 0.05,
    driftY: (Math.random() - 0.5) * 0.05,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
  }));
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let particles = createParticles(width, height);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      particles = createParticles(width, height);
    };
    window.addEventListener("resize", handleResize);

    let frame = 0;
    let animationId: number | undefined;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x = (p.x + p.driftX + width) % width;
        p.y = (p.y + p.driftY + height) % height;
        const twinkle =
          0.4 + 0.6 * Math.abs(Math.sin(frame * p.twinkleSpeed + p.twinkleOffset));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 241, 238, ${twinkle})`;
        ctx.fill();
      }
      frame += 1;
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="particle-field"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- ParticleField`
Expected: PASS, 2 passed.

- [ ] **Step 5: Commit**

```bash
git add components/ParticleField.tsx components/ParticleField.test.tsx
git commit -m "feat: add constellation particle field background"
```

---

### Task 6: Header

**Files:**
- Create: `components/Header.tsx`
- Test: `components/Header.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`/`LanguageProvider` (Task 2), `LanguageToggle` and `MailtoButton` from `./ui/*` (Task 4).
- Produces: `Header()` fixed nav bar with anchors `#problem`, `#how-it-works`, `#vision`, `#team` matching the `id`s that Tasks 8–10 give their sections.

- [ ] **Step 1: Write the failing test**

Create `components/Header.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Header } from "./Header";

function renderHeader() {
  return render(
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );
}

describe("Header", () => {
  it("renders nav items in Spanish by default", () => {
    renderHeader();
    expect(screen.getByText("Problema")).toBeInTheDocument();
    expect(screen.getByText("Cómo funciona")).toBeInTheDocument();
  });

  it("shows a solid background after scrolling", () => {
    renderHeader();
    const header = screen.getByTestId("header");
    expect(header.className).toContain("bg-transparent");

    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(header.className).toContain("backdrop-blur-md");
  });

  it("includes a mailto CTA", () => {
    renderHeader();
    const cta = screen.getByText("Hablemos");
    expect(cta.closest("a")).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:pyxis.latam@gmail.com")
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Header`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the header**

Create `components/Header.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageToggle } from "./ui/LanguageToggle";
import { MailtoButton } from "./ui/MailtoButton";

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#problem", label: t.nav.problem },
    { href: "#how-it-works", label: t.nav.howItWorks },
    { href: "#vision", label: t.nav.vision },
    { href: "#team", label: t.nav.team },
  ];

  return (
    <header
      data-testid="header"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-pyxis-bg/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-display text-sm font-bold tracking-widest text-pyxis-fg">
          PYXIS
        </span>
        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-pyxis-fg/80 hover:text-pyxis-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <MailtoButton email={t.footer.email} label={t.cta.talk} />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Header`
Expected: PASS, 3 passed.

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx components/Header.test.tsx
git commit -m "feat: add fixed header with nav, language toggle, and CTA"
```

---

### Task 7: Hero section

**Files:**
- Create: `components/Hero.tsx`
- Test: `components/Hero.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`/`LanguageProvider` (Task 2), `ParticleField` (Task 5), `MailtoButton` and `Emphasis` (Task 4).
- Produces: `Hero()` full-viewport section, first child of the page composed in Task 12. The headline wrapper moves via a Framer Motion scroll-linked parallax (disabled when reduced motion is preferred).

- [ ] **Step 1: Write the failing test**

Create `components/Hero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Hero } from "./Hero";

it("renders the Spanish headline, particle background, and CTA", () => {
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>
  );
  expect(screen.getByText("cero personas")).toBeInTheDocument();
  expect(screen.getByTestId("particle-field")).toBeInTheDocument();
  expect(screen.getByText("Hablemos").closest("a")).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:")
  );
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Hero`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the hero**

Create `components/Hero.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ParticleField } from "./ParticleField";
import { MailtoButton } from "./ui/MailtoButton";
import { Emphasis } from "./ui/Emphasis";

export function Hero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 80]
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-pyxis-bg"
    >
      <ParticleField />
      <motion.div
        style={{ y: headlineY }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <p className="font-mono-label mb-6 text-xs tracking-[0.3em] text-pyxis-accent">
          {t.hero.eyebrow}
        </p>
        <h1 className="font-display text-4xl font-extrabold leading-tight text-pyxis-fg sm:text-6xl">
          {t.hero.headlinePre} <Emphasis>{t.hero.headlineEmphasis}</Emphasis>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-pyxis-fg/80">
          {t.hero.subheadline}
        </p>
        <div className="mt-10">
          <MailtoButton email={t.footer.email} label={t.hero.cta} />
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Hero`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/Hero.test.tsx
git commit -m "feat: add hero section with particle field and primary CTA"
```

---

### Task 8: Content sections — SocialProof, Problem, HowItWorks

**Files:**
- Create: `components/SocialProof.tsx`
- Create: `components/Problem.tsx`
- Create: `components/HowItWorks.tsx`
- Test: `components/SocialProof.test.tsx`
- Test: `components/Problem.test.tsx`
- Test: `components/HowItWorks.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`/`LanguageProvider` (Task 2), `RevealOnScroll`, `SectionEyebrow`, and `Emphasis` (Task 4).
- Produces: `SocialProof()`, `Problem()` (section `id="problem"`), `HowItWorks()` (section `id="how-it-works"`) — consumed by `app/page.tsx` in Task 12.

- [ ] **Step 1: Write the failing tests**

Create `components/SocialProof.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { SocialProof } from "./SocialProof";

it("renders the pilot social proof line", () => {
  render(
    <LanguageProvider>
      <SocialProof />
    </LanguageProvider>
  );
  expect(
    screen.getByText("Ya en operación con wholesalers piloto en Latinoamérica.")
  ).toBeInTheDocument();
});
```

Create `components/Problem.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Problem } from "./Problem";

it("renders the problem section with correct id and copy", () => {
  const { container } = render(
    <LanguageProvider>
      <Problem />
    </LanguageProvider>
  );
  expect(container.querySelector("#problem")).toBeInTheDocument();
  expect(screen.getByText("un cuello de botella")).toBeInTheDocument();
});
```

Create `components/HowItWorks.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { HowItWorks } from "./HowItWorks";

it("renders all three steps", () => {
  render(
    <LanguageProvider>
      <HowItWorks />
    </LanguageProvider>
  );
  expect(screen.getByText("Detectamos")).toBeInTheDocument();
  expect(screen.getByText("Construimos")).toBeInTheDocument();
  expect(screen.getByText("Multiplicamos")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- "components/(SocialProof|Problem|HowItWorks)"`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the sections**

Create `components/SocialProof.tsx`:

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";

export function SocialProof() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-pyxis-fg/10 bg-pyxis-panel py-6">
      <RevealOnScroll>
        <p className="text-center text-sm tracking-wide text-pyxis-fg/70">
          {t.socialProof.text}
        </p>
      </RevealOnScroll>
    </section>
  );
}
```

Create `components/Problem.tsx`:

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";

export function Problem() {
  const { t } = useLanguage();

  return (
    <section id="problem" className="mx-auto max-w-4xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.problem.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.problem.headlinePre} <Emphasis>{t.problem.headlineEmphasis}</Emphasis>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-pyxis-fg/80">
          {t.problem.body}
        </p>
      </RevealOnScroll>
    </section>
  );
}
```

Create `components/HowItWorks.tsx`:

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.howItWorks.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.howItWorks.headlinePre}{" "}
          <Emphasis>{t.howItWorks.headlineEmphasis}</Emphasis>
        </h2>
      </RevealOnScroll>
      <div className="mt-16 grid gap-10 sm:grid-cols-3">
        {t.howItWorks.steps.map((step, index) => (
          <RevealOnScroll key={step.number} delay={index * 0.15}>
            <span className="font-mono-label text-sm text-pyxis-accent">
              {step.number}
            </span>
            <h3 className="font-display mt-3 text-xl font-bold text-pyxis-fg">
              {step.title}
            </h3>
            <p className="mt-2 text-pyxis-fg/80">{step.body}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- "components/(SocialProof|Problem|HowItWorks)"`
Expected: PASS, 3 passed.

- [ ] **Step 5: Commit**

```bash
git add components/SocialProof.tsx components/Problem.tsx components/HowItWorks.tsx components/SocialProof.test.tsx components/Problem.test.tsx components/HowItWorks.test.tsx
git commit -m "feat: add social proof, problem, and how-it-works sections"
```

---

### Task 9: Vision / roadmap timeline

**Files:**
- Create: `components/Vision.tsx`
- Test: `components/Vision.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`/`LanguageProvider` (Task 2), `RevealOnScroll`, `SectionEyebrow`, and `Emphasis` (Task 4).
- Produces: `Vision()` section `id="vision"` with an animated SVG line, consumed by `app/page.tsx` in Task 12. The line-draw animation respects `prefers-reduced-motion` (renders fully drawn immediately) via `useReducedMotion()`.

- [ ] **Step 1: Write the failing test**

Create `components/Vision.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Vision } from "./Vision";

it("renders the three roadmap phases and the animated line", () => {
  render(
    <LanguageProvider>
      <Vision />
    </LanguageProvider>
  );
  expect(screen.getByText("Piloto")).toBeInTheDocument();
  expect(screen.getByText("Expansión")).toBeInTheDocument();
  expect(screen.getByText("Cero personas")).toBeInTheDocument();
  expect(screen.getByTestId("vision-line")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Vision`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the vision timeline**

Create `components/Vision.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";

export function Vision() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const phases = t.vision.phases;

  return (
    <section id="vision" className="mx-auto max-w-5xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.vision.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.vision.headlinePre} <Emphasis>{t.vision.headlineEmphasis}</Emphasis>
        </h2>
      </RevealOnScroll>

      <div className="relative mt-20">
        <svg
          className="absolute left-0 top-6 hidden w-full sm:block"
          height="2"
          preserveAspectRatio="none"
          data-testid="vision-line"
        >
          <motion.line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="#D9A54D"
            strokeWidth="2"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </svg>
        <div className="grid gap-12 sm:grid-cols-3">
          {phases.map((phase, index) => (
            <RevealOnScroll key={phase.label} delay={index * 0.2}>
              <div className="relative pt-8">
                <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-pyxis-accent" />
                <span className="font-mono-label text-xs tracking-widest text-pyxis-accent">
                  {phase.label}
                </span>
                <h3 className="font-display mt-2 text-xl font-bold text-pyxis-fg">
                  {phase.title}
                </h3>
                <p className="mt-2 text-pyxis-fg/80">{phase.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Vision`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Vision.tsx components/Vision.test.tsx
git commit -m "feat: add vision/roadmap section with animated timeline"
```

---

### Task 10: Team section

**Files:**
- Create: `components/Team.tsx`
- Test: `components/Team.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`/`LanguageProvider` (Task 2), `RevealOnScroll`, `SectionEyebrow`, and `Emphasis` (Task 4).
- Produces: `Team()` section `id="team"` — consumed by `app/page.tsx` in Task 12. Uses initials-avatar placeholders (`member.initials`) until real founder photos are dropped into `public/team/` and swapped in for a `next/image` — out of scope for this plan (no photo files provided yet).

- [ ] **Step 1: Write the failing test**

Create `components/Team.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Team } from "./Team";

it("renders both founders with correct LinkedIn links", () => {
  render(
    <LanguageProvider>
      <Team />
    </LanguageProvider>
  );

  const vicente = screen.getByText("Vicente Pareja").closest("a");
  expect(vicente).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/vicentepareja/"
  );

  const felipe = screen.getByText("Felipe Carvallo Lancellotti").closest("a");
  expect(felipe).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/felipe-carvallo-lancellotti-228615276/?locale=en"
  );
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Team`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the team section**

Create `components/Team.tsx`:

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";

export function Team() {
  const { t } = useLanguage();

  return (
    <section id="team" className="mx-auto max-w-4xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.team.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.team.headlinePre} <Emphasis>{t.team.headlineEmphasis}</Emphasis>
        </h2>
      </RevealOnScroll>
      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        {t.team.members.map((member, index) => (
          <RevealOnScroll key={member.name} delay={index * 0.15}>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pyxis-panel font-display text-lg font-bold text-pyxis-accent">
                {member.initials}
              </span>
              <span>
                <span className="block font-display font-bold text-pyxis-fg group-hover:text-pyxis-accent">
                  {member.name}
                </span>
                <span className="block text-sm text-pyxis-fg/70">
                  {member.role}
                </span>
              </span>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Team`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Team.tsx components/Team.test.tsx
git commit -m "feat: add team section with founder LinkedIn links"
```

---

### Task 11: Final CTA + Footer

**Files:**
- Create: `components/FinalCta.tsx`
- Create: `components/Footer.tsx`
- Test: `components/FinalCta.test.tsx`
- Test: `components/Footer.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`/`LanguageProvider` (Task 2), `RevealOnScroll`, `Emphasis`, and `MailtoButton` (Task 4), `LanguageToggle` (Task 4).
- Produces: `FinalCta()` and `Footer()` — last two elements composed in `app/page.tsx` in Task 12.

- [ ] **Step 1: Write the failing tests**

Create `components/FinalCta.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { FinalCta } from "./FinalCta";

it("renders the closing statement and mailto CTA", () => {
  render(
    <LanguageProvider>
      <FinalCta />
    </LanguageProvider>
  );
  expect(screen.getByText("autónomo")).toBeInTheDocument();
  expect(screen.getByText("Hablemos").closest("a")).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:pyxis.latam@gmail.com")
  );
});
```

Create `components/Footer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Footer } from "./Footer";

it("renders contact email and current year", () => {
  render(
    <LanguageProvider>
      <Footer />
    </LanguageProvider>
  );
  expect(screen.getByText("pyxis.latam@gmail.com")).toHaveAttribute(
    "href",
    "mailto:pyxis.latam@gmail.com"
  );
  expect(
    screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- "components/(FinalCta|Footer)"`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement FinalCta and Footer**

Create `components/FinalCta.tsx`:

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { MailtoButton } from "./ui/MailtoButton";
import { Emphasis } from "./ui/Emphasis";

export function FinalCta() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <RevealOnScroll>
        <h2 className="font-display text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.finalCta.headlinePre} <Emphasis>{t.finalCta.headlineEmphasis}</Emphasis>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-pyxis-fg/80">
          {t.finalCta.body}
        </p>
        <div className="mt-10">
          <MailtoButton email={t.footer.email} label={t.finalCta.cta} />
        </div>
      </RevealOnScroll>
    </section>
  );
}
```

Create `components/Footer.tsx`:

```tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageToggle } from "./ui/LanguageToggle";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-pyxis-fg/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <a
          href={`mailto:${t.footer.email}`}
          className="text-sm text-pyxis-fg/70 hover:text-pyxis-accent"
        >
          {t.footer.email}
        </a>
        <div className="flex items-center gap-6">
          <LanguageToggle />
          <span className="text-sm text-pyxis-fg/50">
            © {year} {t.footer.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- "components/(FinalCta|Footer)"`
Expected: PASS, 2 passed.

- [ ] **Step 5: Commit**

```bash
git add components/FinalCta.tsx components/Footer.tsx components/FinalCta.test.tsx components/Footer.test.tsx
git commit -m "feat: add final CTA and footer sections"
```

---

### Task 12: Compose the homepage

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/page.test.tsx`

**Interfaces:**
- Consumes: `LanguageProvider` (Task 2), `Header` (Task 6), `Hero` (Task 7), `SocialProof`/`Problem`/`HowItWorks` (Task 8), `Vision` (Task 9), `Team` (Task 10), `FinalCta`/`Footer` (Task 11).
- Produces: the full assembled page at `/`, wrapped in `LanguageProvider` at the root layout so every section shares one language state.

- [ ] **Step 1: Update the failing test for the full page**

Replace the full contents of `app/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import Home from "./page";

it("renders every section of the landing page", () => {
  render(
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );

  expect(screen.getByText("PYXIS")).toBeInTheDocument();
  expect(screen.getByText("cero personas")).toBeInTheDocument();
  expect(screen.getByText("un cuello de botella")).toBeInTheDocument();
  expect(screen.getByText("Detectamos")).toBeInTheDocument();
  expect(screen.getByText("Piloto")).toBeInTheDocument();
  expect(screen.getByText("Vicente Pareja")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- "app/page"`
Expected: FAIL — `app/page.tsx` still renders only the Task 1 placeholder.

- [ ] **Step 3: Compose the homepage**

Replace the full contents of `app/page.tsx`:

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Vision } from "@/components/Vision";
import { Team } from "@/components/Team";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <Vision />
        <Team />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
```

Replace the full contents of `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const display = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-label",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Pyxis — Wholesalers sin operación manual",
  description:
    "Pyxis transforma wholesalers en operaciones de cero personas mediante integraciones y agentes que eliminan los cuellos de botella operativos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-pyxis-bg font-display text-pyxis-fg antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Run the full test suite to verify everything passes**

Run: `npm test`
Expected: all test suites pass (no failures).

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/page.tsx app/page.test.tsx
git commit -m "feat: compose full landing page from all sections"
```

---

### Task 13: Production build verification and deploy docs

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: the complete app from Tasks 1–12.
- Produces: a verified production build and a README with local-dev and Vercel deploy instructions.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all suites pass.

- [ ] **Step 2: Run a production build**

Run: `npm run build`
Expected: build completes with exit code 0, no type errors.

- [ ] **Step 3: Write the README**

Create `README.md`:

```markdown
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
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add README with local dev and Vercel deploy instructions"
```
