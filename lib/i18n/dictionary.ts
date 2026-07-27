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
