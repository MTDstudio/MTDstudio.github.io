# MTD Studio — Website

A multi-page static website for MTD Studio, styled with an iOS-inspired
"liquid glass" look: frosted cards, soft ambient gradients, and a shared
red/black/gray theme carried across every page. Pure HTML, CSS and vanilla
JS — no build step, no frameworks, fully compatible with GitHub Pages.

## Pages

```
mtd-portfolio/
├── index.html      → Home — hero, three pathways, quick links
├── studio.html      → Studio — discipline previews + countdown (kept
│                       until real project images/case studies are added)
├── services.html    → Services — Technical Drafting & 3D / Graphic Design
├── pricing.html      → Pricing — disclaimer dialog, rate tables, examples
├── about.html        → About — studio story + growth timeline
├── contact.html       → Contact — the form (Formspree-backed)
├── 404.html            → themed not-found page
├── style.css            → all styling (design tokens at the top)
├── script.js             → countdown, clock, nav, form, pricing dialog
└── assets/
    ├── favicon.png     → web/browser icon
    └── logo-full.png   → full logo, used on the Home hero panel
```

Every page shares the same header (with a scroll-aware sticky nav + mobile
hamburger menu) and footer, so navigation is consistent site-wide.

<!--## Why the Studio page still has a countdown

Per your notes, the Studio page's real content — project photos, drawings
and case studies — isn't ready yet. Rather than show an empty gallery, that
page keeps the countdown/"coming soon" treatment from the original landing
page, alongside short previews of the three disciplines (Built Environment
& Drafting, Graphic Design, Creative Lab) so visitors know what's coming.
Once you have real project images and links, replace the `<section
class="disciplines">` blocks in `studio.html` with actual project cards —
the rest of the site (Home, Services, Pricing, About, Contact) is fully
built out already.-->

## 1. Publish on GitHub Pages (drag & drop)

1. Go to **github.com** → **+** → **New repository**.
2. Name it `yourusername.github.io` for a root domain, or anything else for
   a project site (publishes at `yourusername.github.io/repo-name`).
3. Keep it **Public** → **Create repository**.
4. On the empty repo page, click **"uploading an existing file"**.
5. Drag in every file and the `assets` folder from this project, keeping
   the folder structure exactly as shown above.
6. **Commit changes**.
7. **Settings → Pages → Build and deployment → Source**: choose
   **Deploy from a branch**.
8. **Branch**: `main`, folder `/ (root)` → **Save**.
9. Wait 1–2 minutes, refresh — your live URL appears at the top of the
   Pages settings screen.

Everything here is static HTML/CSS/JS, so it's 100% compliant with GitHub
Pages (no server code, no build process, no external dependencies beyond
Google Fonts).

## 2. Set the Studio countdown date

Open `script.js` and edit:

```js
const LAUNCH_DATE = new Date("2026-09-15T09:00:00");
```

Change this to whenever the full portfolio (with real project images) is
ready to go live.

## 3. Connect the contact form

GitHub Pages has no backend, so the form on `contact.html` needs a free
form service to actually deliver submissions:

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy its endpoint (`https://formspree.io/f/xxxxxxx`).
3. In `contact.html`, find:
   ```html
   <form class="contact__card" id="contactForm" action="https://formspree.io/f/yourFormID" method="POST" novalidate>
   ```
4. Replace `yourFormID` with your real endpoint and commit.

Until then, the button shows a friendly reminder instead of silently failing.

## 4. Pricing page disclaimer

The Pricing page opens a native `<dialog>` with the pricing policy the
first time a visitor opens it in a given browser session (not on every
page reload). A "View Pricing Policy" link under the page header lets
anyone reopen it manually, and a condensed version of the policy is also
shown permanently near the bottom of the page. Edit the copy directly in
`pricing.html` inside `<dialog class="disclaimer-dialog" id="pricingDisclaimer">`
and the `.notice-panel` further down.

## 5. Customize

- **Colors, spacing, radii** — CSS variables at the top of `style.css`
  under `:root`.
- **Copy** — lives directly in each page's HTML.
- **Icons** — small inline SVGs styled by the shared `.icon` /
  `.icon-badge` classes; swap paths directly in the HTML where needed.
- **Logo/icon** — swap files inside `assets/` (keep filenames, or update
  `src` paths across all pages).

<!--## 6. Filling in the Studio page later

When you have real project photography and case studies:

1. Remove or shrink the countdown block in `studio.html`.
2. Replace each `.discipline-card`'s list with actual project entries —
   `<img>` tags or a small gallery grid work well inside the existing
   `.discipline-card` styling.
3. Consider splitting `studio.html` into per-discipline pages if the
   galleries grow large (e.g. `studio-built-environment.html`), linking
   from the pathway cards on `index.html` and the Studio page itself.-->
