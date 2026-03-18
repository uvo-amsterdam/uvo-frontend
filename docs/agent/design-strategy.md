# Design Strategy

This document outlines the design philosophy, visual identity, and guiding principles for the UvO Amsterdam website. It serves as a reference for anyone contributing to the frontend to ensure consistency and intentionality in every design decision.

---

<!-- TOC -->
* [Design Strategy](#design-strategy)
  * [1. Who We Are](#1-who-we-are)
  * [2. Design Philosophy](#2-design-philosophy)
    * [2.1 We Are a Sports Club, Not a SaaS Product](#21-we-are-a-sports-club-not-a-saas-product)
    * [2.2 Athletic, Bold, and Energetic](#22-athletic-bold-and-energetic)
    * [2.3 Warm and Approachable](#23-warm-and-approachable)
  * [3. Visual Identity](#3-visual-identity)
    * [3.1 Color Palette](#31-color-palette)
    * [3.2 Typography](#32-typography)
    * [3.3 Decorative Elements](#33-decorative-elements)
  * [4. Tone of Voice](#4-tone-of-voice)
  * [5. Layout Principles](#5-layout-principles)
  * [6. Component Guidelines](#6-component-guidelines)
  * [7. Anti-Patterns (What to Avoid)](#7-anti-patterns-what-to-avoid)
  * [8. Reference and Inspiration](#8-reference-and-inspiration)
  * [9. Code Quality Principles (DRY & SOLID)](#9-code-quality-principles-dry--solid)
    * [9.1 Shared SCSS Mixins](#91-shared-scss-mixins)
    * [9.2 Utility Extraction](#92-utility-extraction)
    * [9.3 Component Composition](#93-component-composition)
  * [10. Library Usage Guidelines](#10-library-usage-guidelines)
    * [10.1 Radix UI (Themes & Primitives)](#101-radix-ui-themes--primitives)
    * [10.2 Tabler Icons](#102-tabler-icons)
    * [10.3 Next.js Components](#103-nextjs-components)
<!-- TOC -->

---

## 1. Who We Are

UvO Amsterdam is a **student volleyball association** with 250+ members, 15 teams, and 25+ years of history. The website represents a community of athletes, students, and friends — not a commercial enterprise.

Every page should feel like it belongs to a **sports club**: energetic, community-driven, and fun. Visitors should immediately sense that this is a place where people play volleyball and have a great time together.

## 2. Design Philosophy

### 2.1 We Are a Sports Club, Not a SaaS Product

This is the single most important design principle. Many modern web templates lean towards a "startup" or "SaaS" aesthetic — clean, corporate, and transactional. That's not us.

**Signs you've accidentally gone SaaS:**
- Pastel-colored "feature cards" with abstract icons (the classic SaaS 3-card grid)
- Overly polished "legal warning" style callout boxes
- Generic stock photography or placeholder illustrations
- Copy that reads like marketing material for a B2B product ("Unlock your potential", "Get started today")
- Excessive whitespace that feels sterile rather than clean

**What we do instead:**
- Bold, chunky typography that feels like a sports jersey
- Real photos of our members playing, celebrating, and hanging out
- Copy that sounds like a friend inviting you to join the team
- Layouts inspired by sports magazines and athletic brand sites
- Warm, textured backgrounds (our `$off-white: #f5f3ef`) instead of clinical pure white

### 2.2 Athletic, Bold, and Energetic

The design should feel **dynamic and physical**. Think sports broadcast graphics, volleyball tournament posters, and athletic brand campaigns — not enterprise dashboards.

- Headings are **uppercase, condensed, and heavy** (`Barlow Condensed 800`)
- Accent elements are **bright and confident** (`$accent-color: #FF6B35`)
- Transitions are **smooth but subtle** — enough to feel alive, not enough to feel flashy
- Decorative volleyball-seam curves add personality and movement

### 2.3 Warm and Approachable

UvO is a student association first. The design should feel welcoming, not intimidating.

- Use warm neutrals (`$off-white`, `$cream`) instead of cold grays
- Photography shows real moments: training, celebrations, team photos
- CTAs use inviting language ("Ready to join the fun?" instead of "Get Started")
- The overall tone is friendly and enthusiastic

## 3. Visual Identity

### 3.1 Color Palette

| Token              | Value     | Usage                                           |
| ------------------- | --------- | ------------------------------------------------ |
| `$primary-color`   | `#4342FF` | Brand blue. Headers, nav bar, hero backgrounds   |
| `$accent-color`    | `#FF6B35` | Action orange. CTAs, underlines, icons, highlights |
| `$secondary-color` | `#3DDC97` | Supporting green. Success states, badges          |
| `$off-white`       | `#f5f3ef` | Page background. Warm, not sterile                |
| `$cream`           | `#faf8f4` | Lighter card background variant                   |
| `$gray-800`        | `#1f2937` | Primary text color                                |
| `$gray-600`        | `#4b5563` | Secondary text, subtitles                         |

**Key rule:** Avoid introducing new colors. The palette is intentionally limited to maintain a strong, recognizable identity.

### 3.2 Typography

| Role     | Font              | Weight   | Style                        |
| -------- | ----------------- | -------- | ---------------------------- |
| Headings | `Barlow Condensed` | 600–900 | Uppercase, tight letter-spacing |
| Body     | `Inter`            | 300–700 | Normal case, readable          |

The heading font is the core of the athletic feel. It should be used for:
- All `<h1>` and `<h2>` elements (via the `section-heading` mixin)
- Navigation links
- CTA buttons
- Any text that needs to feel "sporty"

Body text uses `Inter` for maximum readability and a modern, clean feel.

### 3.3 Decorative Elements

- **Volleyball seam curves:** Subtle curved SVG or CSS shapes that evoke the stitching on a volleyball. Used as section dividers and background accents (e.g., the `::before` pseudo-elements on hero sections).
- **Orange accent underlines:** A 4px-wide `$accent-color` bar placed below section headings via `::after`. This is a signature element — use it consistently.
- **Crosshatch patterns:** Faint diagonal line textures on decorative background shapes, adding subtle depth without being distracting.
- **Elliptical masks:** Curved `clip-path` transitions between sections (e.g., the Tickets page hero-to-content transition).

## 4. Tone of Voice

The copy on the website should feel like it's written by a friend who's excited about volleyball.

| ✅ Do                                               | ❌ Don't                                            |
| --------------------------------------------------- | --------------------------------------------------- |
| "Wash cold, no softener. Keep it out of the dryer." | "Please note that items must be washed at 30°C..."  |
| "Sizes run small — we recommend sizing up!"         | "Warning: Sizing may differ from standard charts."  |
| "Custom gear means we can't do refunds."            | "Due to the custom nature of our products, returns..." |
| "Ready to join the fun?"                            | "Get started with your membership today."           |
| "Gear up with the official UvO collection"          | "Explore our comprehensive merchandise offerings"   |

**Principles:**
- Short, punchy sentences
- Direct and honest
- Enthusiastic but not over the top
- Use "we" and "you" — it's a conversation, not a press release

## 5. Layout Principles

1. **Full-width heroes, contained content.** Hero/banner sections span the full viewport. Content sections use `max-width: 1400px` with `padding: 0 8%` for breathing room.

2. **Magazine-style grids.** When displaying info alongside a heading, prefer a 2-column layout (heading left, content right) inspired by sports magazine spreads. Avoid the generic "3 icon cards in a row" pattern.

3. **Photography is king.** Real photos of members are always better than illustrations, icons, or generated images. When photos aren't available, use AI-generated lifestyle images as placeholders — never leave sections image-less.

4. **Responsive breakpoints:**
   - `$breakpoint-sm (48em)` — Single column, reduced padding
   - `$breakpoint-md (64em)` — 2-column grids
   - `$breakpoint-lg (80em)` — Full multi-column layouts

5. **Section rhythm.** Alternate between content-heavy and visual sections. Don't stack multiple text-heavy blocks. Use photo grids, stats, or CTAs to break up the flow.

## 6. Component Guidelines

| Component Type    | Guidance                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------- |
| **Hero sections** | Use `$primary-color` or `$off-white` backgrounds. Include a volleyball-seam curve decoration. Always have a clear heading + subtitle. |
| **CTAs**          | Use `$accent-color` buttons with uppercase text. Keep on white/off-white backgrounds. Avoid wrapping CTAs in colored "wave" sections unless it's the homepage signup CTA. |
| **Info sections** | Prefer the magazine 2-column layout (bold heading left, bullet content right). Use Tabler icons for visual anchors. |
| **Image grids**   | 3 columns on desktop, 2 on tablet, 1 on mobile. Rounded corners (`12px`), subtle shadow, gentle hover scale. |
| **Navigation**    | Group related links under dropdown menus (e.g., "Shop" contains Merch + Tickets). Keep the nav bar clean and uncluttered. |
| **Embeds**        | Wrap iframes in a rounded container with shadow. Always provide a fallback "open in new tab" link. |

## 7. Anti-Patterns (What to Avoid)

These are patterns that have crept in during development and were intentionally removed. Don't reintroduce them:

- **SaaS-style info cards:** Three equally-sized cards with an icon, title, and short description in a row. This screams "pricing tier" or "feature comparison." Use the magazine layout instead.
- **Alert-style callout boxes:** Colored boxes with warning icons and fine-print text feel like legal disclaimers. Frame the same info as friendly bullet points with relevant icons.
- **Repetitive curved sections:** The volleyball-seam curve is a great branding element but loses its impact when overused. Reserve it for the homepage CTA and page hero transitions — not every single section boundary.
- **Generic placeholder text:** Don't use "Lorem ipsum" or generic descriptions. Even placeholder content should feel like UvO.
- **Corporate vocabulary:** Words like "comprehensive," "solutions," "leverage," "optimize" have no place on a sports club website.

## 8. Reference and Inspiration

When designing new pages or components, look to these types of sources for inspiration:

- **Sports brand websites:** Nike, Adidas, Under Armour — bold typography, athlete photography, energetic layouts
- **Sports magazine layouts:** ESPN Magazine, Sports Illustrated — asymmetric grids, large headings, editorial feel
- **University athletics sites:** College team homepages — community-focused, schedule-driven, photo-heavy
- **Other student sports associations:** Look at what other clubs in the Nevobo network are doing

**Never** look to SaaS landing pages, startup templates, or corporate websites. They'll pull the design in the wrong direction every time.

## 9. Code Quality Principles (DRY & SOLID)

Maintaining clean, DRY, SOLID code is just as important as visual consistency. Every new page or component should reuse existing abstractions before writing new CSS or utility functions.

### 9.1 Shared SCSS Mixins

The file `src/styles/_tokens.scss` contains shared mixins and theme variables. **Import them via `@use '@styles/tokens' as tokens`** and always use these mixins instead of writing the same CSS from scratch:

| Mixin | Purpose | Context / Notes |
| --- | --- | --- |
| `hero-solid($pad, $pad-sm)` | Solid-color brand hero with decorative seam arc | Color hero pages (competition, tickets) |
| `hero-content($max-w)` | Positioned content container inside heroes | Title + subtitle wrapper |
| `hero-title($size, $size-sm)` | Hero heading typography | Applied to the heading inside heroes |
| `hero-subtitle` | Hero subtitle typography | Applied to the text subtitle inside heroes |
| `hero-icon` | Hero decorative icon styling | Tabler icon in solid-color heroes |
| `section-heading` | Base heading typography | Large bold uppercase condensed font |
| `section-subtitle` | Base subtitle typography | Muted color and base font size |
| `section-title-accent($size, $size-sm, $bar-width)` | Section heading with orange accent underline | Any `<h2>` section heading |
| `numbered-item` / `numbered-item-number` / `numbered-item-text` | Numbered step / point list pattern | Instructional steps, selling points |
| `content-section($pad, $pad-sm)` | Constrained content area (max-width 1400px, 8% padding) | Any content section below a hero |
| `cta-button` | Accent-colored call-to-action button | Primary action links |

**Rule:** If you're writing more than 5 lines of hero-related CSS in a page stylesheet, you should be using one of these mixins from the `tokens` namespace.

### 9.2 Utility Extraction

Shared utility functions live in `src/utils/`. Before writing a helper function inline in a component:

1. **Check `src/utils/`** for an existing function that does what you need.
2. If none exists and the function is likely to be reused, **create it in `src/utils/`** and import it.
3. Never duplicate utility functions across components (e.g., date formatting, data normalization).

Current utilities:
- `date-utils.ts` — Excel serial date ↔ JS Date conversions, used by Nevobo data components.

### 9.3 Component Composition

- **Single Responsibility:** Components should do one thing. Separate data fetching/parsing logic from rendering where possible.
- **Open for Extension:** Prefer props and composition over copy-pasting component code. If two pages share a similar section, extract a shared component with configurable props.
- **Consistent Naming:** Default-exported page components must be named after their route (e.g., the `/training` page exports `Training`, not `MemberInfo`).
- **No Unnecessary Global Imports:** Don't import `src/styles/globals.scss` in page modules — it's applied via the root layout. For theme tokens or mixins, always use `@use '@styles/tokens'`.

## 10. Library Usage Guidelines

We have three UI libraries installed. Use them consistently to avoid reinventing built-in functionality.

### 10.1 Radix UI (Themes & Primitives)

**Installed packages:** `@radix-ui/themes`, `@radix-ui/react-accordion`

| When to use | Component |
| --- | --- |
| Headings | `<Heading>` from `@radix-ui/themes` |
| Body text / paragraphs | `<Text>` from `@radix-ui/themes` |
| External links | `<Link>` from `@radix-ui/themes` |
| Buttons / CTA wrappers | `<Button>` from `@radix-ui/themes` (with `asChild` for link buttons) |
| Bold / emphasis | `<Strong>`, `<Em>` from `@radix-ui/themes` |
| Accordion / Collapsible | `@radix-ui/react-accordion` |

**Rules:**
- Prefer Radix typography components (`Heading`, `Text`) over raw `<h1>`–`<h6>` and `<p>` tags for consistent sizing and weight.
- Use Radix `Link` for external links (it adds appropriate `rel` attributes and styling).
- When wrapping a Next.js `<Link>` inside a Radix component, use the `asChild` pattern.

### 10.2 Tabler Icons

**Installed package:** `@tabler/icons-react`

- Use Tabler icons for **all** iconography throughout the site. Do not use emoji, Unicode symbols, or SVGs from other libraries.
- Keep icon props consistent: `size={28}` for inline icons, `size={44}` for hero/card icons, and `stroke={1.5}` as the default weight.
- Import icons by their specific name (e.g., `IconChevronDown`) — never use a generic icon loader.

### 10.3 Next.js Components

| When to use | Component |
| --- | --- |
| Internal navigation links | `<Link>` from `next/link` (`NextLink`) |
| Optimized images | `<Image>` from `next/image` |
| Page metadata | `export const metadata: Metadata` |

**Rules:**
- **Never use raw `<a>` tags for internal links.** Always use `next/link` for client-side navigation and proper prefetching.
- Use raw `<a>` only for external links that should open in a new tab, and pair with `target="_blank"` + `rel="noopener noreferrer"`.
- Always use `next/image` for images — it provides automatic optimization, lazy loading, and responsive sizing.
- Every page should export `metadata` for SEO (title, description).
