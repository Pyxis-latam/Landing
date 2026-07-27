# Pyxis Landing Page — Design Spec

Date: 2026-07-27

## Contexto y objetivo

Pyxis transforma empresas wholesaler en "0 man operations": identifican los cuellos de
botella operativos de un wholesaler y construyen herramientas (integraciones, agentes,
automatización) que multiplican la eficiencia de cada trabajador, con la visión de
eliminar por completo la necesidad de operación manual.

La landing tiene tres audiencias simultáneas:

1. **YC** — la postulación/entrevista a Y Combinator. Debe leerse ambiciosa e inspiradora.
2. **Early customers** — wholesalers potenciales que puedan interesarse y contactar.
3. **Reclutamiento / inversores angel** — personas evaluando unirse o invertir.

Etapa actual de la empresa: **clientes piloto activos**, pero sin métricas concretas
listas para publicar todavía. El copy de prueba social debe ser cualitativo, no
numérico (nada de porcentajes o cifras inventadas).

Founders:
- **Vicente Pareja** — CEO. LinkedIn: https://www.linkedin.com/in/vicentepareja/
- **Felipe Carvallo Lancellotti** — Chief Deployment Officer (CDO). LinkedIn:
  https://www.linkedin.com/in/felipe-carvallo-lancellotti-228615276/?locale=en

Contacto: pyxis.latam@gmail.com

Assets de marca: ninguno existente todavía (se diseña identidad visual desde cero como
parte de este proyecto). Hay fotos profesionales de ambos founders disponibles para la
sección de equipo (el usuario las proveerá antes/durante implementación).

Idioma: la landing se escribe en **español** como idioma por defecto, con un **toggle**
que traduce toda la página a inglés sin recargar ni cambiar de URL.

Referencias de diseño explícitas del usuario: https://www.gru.space y
https://osirisxp.com — estética oscura tipo aeroespacial, tipografía grande y audaz,
narrativa de scroll vertical, animaciones de scroll/parallax, timeline de visión a
futuro, CTAs repetidos.

Restricción explícita del usuario: debe ser **fácil de deployar en Vercel**.

## Stack técnico

- **Next.js (App Router) + TypeScript**, desplegado en Vercel sin configuración
  adicional (Vercel es el creador de Next.js — conectar el repo y listo).
- **Tailwind CSS** para estilos.
- **Framer Motion** para scroll-reveals, parallax sutil y micro-interacciones.
- **CTA vía `mailto:pyxis.latam@gmail.com`** — sin backend, sin API routes, sin
  variables de entorno. La página es 100% estática, lo que hace el deploy trivial y
  sin superficie de fallo en producción.
- **Selector de idioma**: diccionario simple (`es.json` / `en.json`) + React Context
  que cambia el texto renderizado en el cliente. Sin librería de i18n con ruteo
  (`/en`, `/es`) — es una sola página, así que ruteo agregaría complejidad sin
  beneficio.

Alternativas consideradas y descartadas: Astro (menos idiomático para animación con
estado de React), Vite+React puro (pierde `next/font` y optimización de imágenes de
Next sin ganar nada dado que Vercel favorece Next.js nativamente).

## Identidad visual

Concepto ancla: **Pyxis**, la constelación que representa la brújula del navegante
(parte de la antigua Argo Navis) — de un caos operativo (wholesaler manual, disperso) a
un rumbo autónomo y preciso. Visualmente inspirado en gru.space / osirisxp.com pero no
idéntico: mismo género (oscuro, aeroespacial, ambicioso), acento cromático propio.

**Paleta**:
- Fondo: negro casi puro `#050505`.
- Texto: blanco roto `#F2F1EE` (no blanco puro).
- Acento primario: ámbar/bronce `#D9A54D` — evoca instrumento de navegación (sextante,
  brújula de latón), diferencia visual frente a las referencias (que usan azules/
  púrpuras cósmicos).
- Secundario/paneles: gris azulado muy oscuro `#12141A`, para dar profundidad sin
  competir con el fondo.

**Tipografía**:
- Titulares: sans-serif grotesk bold (peso 700–800, ej. familia tipo Inter/General
  Sans vía `next/font`), con **cursiva** reservada para la palabra clave de cada
  headline.
- Eyebrows/labels de sección: monoespaciada, tamaño pequeño, tracking amplio, formato
  `01 — EL PROBLEMA`.
- Cuerpo: sans-serif regular, alto contraste de tamaño respecto al headline para
  jerarquía dramática.

**Textura**: grano/noise sutil sobre el negro (evita que se vea "plástico"); canvas de
partículas tipo constelación con drift lentísimo en el hero (puntos dispersos, tenues,
ocasional destello — sugiere navegación, no un starfield genérico).

## Estructura de página y contenido

Narrativa de scroll vertical, una sola página:

1. **Header fijo** — logo "PYXIS" (símbolo de brújula simplificado), nav (Problema ·
   Cómo funciona · Visión · Equipo), toggle de idioma (ES/EN), botón CTA pequeño
   ("Hablemos"). Se comprime y gana fondo sólido con blur al hacer scroll.

2. **Hero** — headline grande y ambicioso (ej. "Transformamos wholesalers en
   operaciones de *cero personas*"), subheadline de una línea, CTA primario (mailto),
   fondo con canvas de partículas/constelación.

3. **Prueba social ligera** — franja discreta cualitativa (ej. "Ya operando con
   wholesalers piloto en Latinoamérica"), sin cifras.

4. **El problema** — eyebrow `01 — EL PROBLEMA`; copy sobre cómo los wholesalers están
   atrapados en procesos manuales y cuellos de botella que limitan su crecimiento.

5. **Cómo funciona** — eyebrow `02 — CÓMO FUNCIONA`; 3 pasos: identificamos cuellos de
   botella → construimos integraciones y agentes → multiplicamos la eficiencia por
   trabajador. Cada paso con número/ícono grande.

6. **Visión / Roadmap** — eyebrow `03 — LA VISIÓN`; línea de tiempo de 3 fases
   redactadas por Claude durante implementación (piloto actual → expansión regional →
   wholesaler 100% autónomo), orientación horizontal o vertical según viewport, el
   trazo se "dibuja" progresivamente con el scroll.

7. **Equipo** — Vicente Pareja (CEO) y Felipe Carvallo (CDO), foto, rol, link a
   LinkedIn de cada uno.

8. **CTA final** — statement de cierre grande + botón mailto repetido.

9. **Footer** — email de contacto, links sociales (placeholder, sin URLs reales
   todavía), toggle de idioma, copyright.

## Interacción y animación

- Scroll-reveal por sección: fade + slide-up sutil al entrar en viewport (Framer
  Motion `whileInView`), timing escalonado entre elementos hermanos.
- Hero: partículas con drift lentísimo (sin reacción al mouse); parallax vertical leve
  en el headline (se mueve más lento que el resto al hacer scroll).
- Nav: transición de transparente a fondo sólido con blur al hacer scroll.
- Roadmap: línea de tiempo con `stroke-dasharray` animado que se dibuja según scroll.
- Botones: hover con intensificación del ámbar + leve escala; sin efectos
  "magnéticos" para mantener el bundle liviano.
- Cursiva de headlines: aparición con blur-to-sharp.
- Respeta `prefers-reduced-motion` desactivando animaciones no esenciales.
- Sin librerías 3D/WebGL — todo con Framer Motion + CSS/canvas 2D, bundle chico,
  deploy en Vercel sin fricción.

## Fuera de alcance (explícito)

- Métricas/números reales de clientes piloto (copy queda cualitativo).
- Formulario de contacto con backend/servicio de terceros (se usa mailto).
- Ruteo de idioma por URL (`/en`, `/es`).
- Logos de inversores o partners (no existen assets todavía).
- Contenido de blog, páginas legales (privacidad/términos), páginas de careers
  detalladas — la landing es de una sola página.
