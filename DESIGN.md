# Design

## Theme

Dark. The site exists in the world of a watchmaker's studio at night — a controlled environment where light is introduced deliberately, not ambient. Every surface is near-black with slight warm tinting toward the brand gold. No light mode.

Physical scene: a collector sitting in a dim room, 10pm, considering a purchase that will last 30 years. The screen should feel like holding the object under a focused lamp.

## Color

Strategy: **Committed** — the gold accent carries 30–60% of attention across key surfaces (dial swatches, headings, glows, stats). The near-black field is not a neutral — it is the product.

### Palette

| Role | Value | Usage |
|---|---|---|
| Surface / base | `#08080a` | Page background, darkest panels |
| Surface raised | `#0c0c10` | Cards, configurator panel, material cards |
| Surface overlay | `#14120f` | Warm-tinted panels (Dial, Caseback detail panels) |
| Gold accent | `#c9a853` | Primary accent: CTAs, glow radials, stat numbers, marquee dots, spotlight |
| Gold light | `#e8c96b` | Page transition curtain highlight |
| Gold dim | `rgba(201,168,83,0.7)` | Subheadings, labels, amber text |
| Foreground | `#ededed` | Primary text |
| Foreground muted | `rgba(255,255,255,0.50)` | Body copy |
| Foreground dim | `rgba(255,255,255,0.30)` | Meta labels, mono captions |
| Foreground ghost | `rgba(255,255,255,0.08–0.20)` | Borders, dividers |
| Case steel | `#c0c0c0` | Material: Brushed Steel |
| Case PVD | `#1a1a1a` | Material: PVD Black |
| Dial steel (blue) | `#2b3d5c` | Slate Blue dial |
| Dial hunter | `#2c4a35` | Hunter Green dial |
| Dial salmon | `#d4826a` | Salmon dial |

### Radial glows

Used to simulate focused light on dark surfaces. Never decorative fills — always tied to a specific object (the watch, a material swatch, a stat block).

- Hero radial: `radial-gradient(60% 50% at 50% 35%, rgba(201,168,83,0.10), transparent 70%)`
- Card glow (gold): `radial-gradient(60% 50% at 50% 100%, rgba(201,168,83,0.18), transparent)`
- Section glow: `radial-gradient(ellipse 70% 40% at 50% 50%, rgba(201,168,83,0.05), transparent)`

## Typography

Three typefaces, three distinct roles. Never mix roles.

| Role | Font | Weight | Style | Usage |
|---|---|---|---|---|
| Display / Serif | Instrument Serif | 400 | Italic | Headlines, product name, section headings, panel headings, pull quotes |
| Body / Sans | Geist Sans | 400–600 | Normal | Body copy, nav, UI labels, CTA text |
| Data / Mono | Geist Mono | 400 | Normal | Labels, prices, step numbers, tracking-widest captions, marquee text |

### Scale (approximate)

| Step | Size | Usage |
|---|---|---|
| Hero | `6xl–8xl` (3.75–6rem) | "The Calibre One" headline |
| Section | `4xl–5xl` (2.25–3rem) | Section headings |
| Card heading | `2xl–3xl` (1.5–1.875rem) | Card titles, panel headings |
| Body | `sm–base` (0.875–1rem) | All body copy, max 65ch |
| Caption / label | `10–11px` | Mono labels, tracking 0.35–0.4em |

### Typographic treatments

- **SplitHeadline `by="blur"`**: section headings emerge from blur per word on scroll (motionsites.ai reference)
- **SplitHeadline `by="char"`**: hero title (immediate, on load) — now set to `by="blur"`  
- Line height: `leading-[0.9]` for hero display; `leading-7` (1.75) for body
- Letter spacing: `tracking-tight` display; `tracking-[0.35em–0.4em]` mono labels

## Elevation

| Level | Surface | Treatment |
|---|---|---|
| 0 | Page | `#08080a` |
| 1 | Cards, panels | `#0c0c10` + `border border-white/8` |
| 2 | Hover state | `border-white/20` + radial glow activates |
| 3 | Active / selected | Ring `ring-amber-200/60` or `border-amber-200/40` |
| Overlay | Drawer, modal | `bg-[#0c0c10]` + `border-l border-white/10` |

## Components

### Configurator
Split layout: 3D canvas left (square, `aspect-square`, `rounded-3xl`), controls right. Color swatches as `h-9 w-9` rounded-full circles with ring on active. Size as pill buttons. Material as pill buttons with price delta. "Select a size" CTA unlocks when size is chosen.

### Cards (Material, Feature, Testimonial)
`rounded-2xl border border-white/8 bg-[#0c0c10] p-8`. TiltCard wrapper adds 3D mouse parallax (8–14° max). Radial glow on hover via `group-hover:opacity-100`. No identical grid — material cards have swatch orbs, feature cards have no icon, testimonial cards have quote marks at 6xl.

### Marquee
Full-width ticker. `border-y border-white/8 py-4`. Mono 11px, `tracking-[0.35em]`. Gold `·` separators at `text-amber-200/40`. Two instances: forward and reverse. GSAP `modifiers.x` infinite loop, speeds up with scroll delta.

### Horizontal scroll (DetailsSection)
GSAP-pinned. Track width = 5 panels × 70vw + 28vw intro. Each panel: `bg-gradient-to-br` with unique warm/cool toning, full-height SVG technical illustration (clock, case, gear, gem, caseback), text anchored to bottom. Scrub 1.2.

### ScrollReveal3D
`rotateX` from N degrees (8–14°) to 0 on scroll. CSS `perspective: 1200px` wrapper. `once: true`.

### MagneticCursor
Dot (8px white) + lagging ring (32px, `border-white/50`). Ring expands to 56px gold on `<a>`/`<button>` hover. Magnetic pull: element moves 35% toward cursor. Hidden on touch devices.

### PageTransition curtain
Gold gradient (`#c9a853 → #e8c96b → #a07830`) full-screen fixed div. `scaleY` sweep on route change via GSAP. `z-[9000]`.

### FilmGrain
SVG `feTurbulence` filter (`fractalNoise`, `baseFrequency 0.65`, 3 octaves). Seed animates at 16fps. `mix-blend-mode: overlay`, `opacity: 0.032`. `z-[9500]`.

### SpotlightCursor
Radial gradient (`420px circle`, gold `rgba(201,168,83,0.055)`) follows cursor with 0.07 lerp lag. `mix-blend-mode: screen`. `z-[9490]`.

### HeroParticles
55 canvas particles, gold `rgba(201,168,83,α)`. Float upward slowly, alpha drifts. Wrap edges. `z-[2]` inside hero.

### CountUp
GSAP tween from 0 to `end`, `power2.out`, triggered by ScrollTrigger. Mono italic serif display size. Gold `text-amber-200/90`.

### SplitHeadline
Three modes: `word` (default slide-up per word), `char` (slide-up per char), `blur` (fade+blur per word, 14px → 0, `power2.out`). `overflow: hidden` wrapper per unit. Scroll-triggered `once: true` or `immediate` for hero.

## Motion

Energy level: **deliberate, slow, cinematic**. Nothing snaps. Nothing bounces.

| Pattern | Easing | Duration |
|---|---|---|
| Page transitions | `power3.inOut` | 0.45s in, 0.45s out |
| Scroll reveals (3D tilt) | `power2.out` | GSAP scrub 1.0 |
| Split headline blur | `power2.out` | 1.0s per word, stagger 0.07s |
| Counter animations | `power2.out` | 2.2s |
| Cursor ring lerp | — | 0.12 per frame |
| Spotlight lerp | — | 0.07 per frame |
| Horizontal scroll | `none` (scrub) | scrub 1.2 |
| Tilt card | `ease-out` CSS | 0.1s in, 0.5s return |
| Hover glows | CSS transition | 0.3–0.5s |

All GSAP animations check `prefers-reduced-motion: reduce` and skip or reduce.

## Layout

- Max content width: `max-w-6xl` (72rem) with `px-6 sm:px-10`
- Configurator: full-width section with centered max-w-6xl grid (3D left, controls right)
- Section vertical rhythm: `py-24` standard, `py-28` newsletter
- Grid: `sm:grid-cols-3` for features, materials, testimonials, process steps
- Stats strip: `grid-cols-2 sm:grid-cols-4` inside `rounded-2xl border border-white/8`
- Footer: flex row on sm+, stacked on mobile, `py-10 border-t border-white/10`

## Spacing tokens (approximate)

| Name | Value | Usage |
|---|---|---|
| section-y | `py-24` (6rem) | Standard vertical section padding |
| card-inner | `p-8` (2rem) | Card interior padding |
| card-gap | `gap-5` (1.25rem) | Grid gap between cards |
| label-tracking | `tracking-[0.4em]` | Mono label letter spacing |
| border-subtle | `border-white/8` | Default card/divider border |
| border-hover | `border-white/20` | Hover card border |
