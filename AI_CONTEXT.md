# MTD Studio - AI Project Context

This is a living, local-only handoff document for continuing website work in a new AI session or workspace.

## Local-only status

- Keep `AI_CONTEXT.md` outside Git and never upload or commit it to GitHub.
- It is ignored by `.gitignore`.
- It must be updated after each development session and immediately before every commit or push.
- It must describe the current code state, not a planned or hypothetical state.
- Never replace this file with only a generic summary. Preserve useful prior decisions and append dated session notes.

## Mandatory maintenance workflow

Before completing a coding session:
1. Record all files changed during the session.
2. Summarize the behavioral outcome of each change.
3. Record verification performed and any known issues or remaining work.
4. Add a dated entry under `Current session changes`.
5. Update `Next AI starting state` so another AI can continue without rereading the entire project.

Before every commit or push:
1. Review `git status` and `git diff`.
2. Update this file with the final set of changes, verification, and known gaps.
3. Verify `AI_CONTEXT.md` is ignored: `git check-ignore -v AI_CONTEXT.md`.
4. Stage only repository files; do not stage this file.
5. Use `git status --ignored` to confirm it remains local-only.

Git convenience commands:
- `git check-ignore -v AI_CONTEXT.md`
- `git status --ignored`
- `git diff --stat`

## Project summary

MTD Studio is a static multi-page website hosted with GitHub Pages. It uses plain HTML, shared CSS, and vanilla JavaScript. There is no build step or framework.

## Public pages

- `index.html`: Home page, hero, three pathways, quick links, and closing call to action.
- `about.html`: Studio story, growth cards, timeline, and call to action.
- `services.html`: Technical drafting and 3D services, plus graphic design services.
- `studio.html`: Portfolio disciplines and a launch countdown for upcoming project galleries.
- `pricing.html`: Pricing tables, disclaimer dialog, policy notice, and quote call to action.
- `contact.html`: Contact details and Formspree-backed contact form.
- `404.html`: No-index themed not-found page.

## Shared files

- `style.css`: Shared design system, layout, components, responsive rules, and animations.
- `script.js`: Countdown, clock, mobile navigation, page effects, form handling, and pricing dialog behavior.
- `assets/`: Images, icons, and other static media.
- `CNAME`: Custom domain configuration for GitHub Pages.

## Design direction

- Theme: dark iOS-inspired liquid-glass interface.
- Palette: near-black surfaces, red accents, neutral gray text, and low-opacity borders.
- Main palette variables are defined at the top of `style.css`.
- Preserve the shared header, footer, background scene, and navigation structure across pages.
- Keep animations restrained and useful.
- Use existing component classes instead of inventing unrelated component styles.

## Page-header convention

The inner pages use `<div class="page-header">`.

Desktop behavior:
- The row is dynamically centered in the page container.
- Three compact columns hold the eyebrow, title, and description.
- Content in every column is left-aligned.
- Column widths and gaps respond to viewport width.
- Eyebrows use the muted `--text-dim` gray color.
- Titles use the display font and remain visually prominent.
- Vertical dividers separate adjacent columns.
- If a page has no description, do not render the divider after the title.
- Studio uses `Launching Soon` as its left eyebrow, with no clock icon.

Mobile behavior:
- Stack the eyebrow, title, and description.
- Keep every item left-aligned, in eyebrow, title, description order.
- Remove all vertical column separators and divider padding.
- Reduce header padding and avoid horizontal overflow.

## Metadata conventions

- Titles begin with `MTD Studio` and use `|` separators.
- Public pages have exact canonical tags pointing to `https://mtdstudio.co.za` or the relevant public page.
- `404.html` has no canonical tag and includes `noindex` metadata.
- Visible text and metadata contain no em dashes or en dashes.

## Copy conventions

- Use natural punctuation instead of em dashes or en dashes.
- Use `Work With Us` for the pricing navigation label.
- The index services quick link is `What We Do -> Services`.
- Keep copy direct, practical, and concise.

## Development rules

- This is a static site. Do not introduce build tools, frameworks, package managers, or a backend unless explicitly requested.
- Keep shared behavior in `style.css` and `script.js`.
- Preserve responsive behavior across desktop, tablet, and mobile.
- Use two-space indentation in HTML.
- Do not rename existing CSS classes or JS IDs unless the change requires it.
- Do not add copyright or license headers.
- Do not add extra documentation or summary files unless requested.
- Before moving or restructuring a page section, verify all IDs and links that reference it.
- Studio countdown IDs include `days`, `hours`, `minutes`, `seconds`, and `progressFill`.
- Run a focused HTML/CSS validation after any edit and report what was tested.

## Current session changes

### 2026-11-23

- Standardized public page titles and canonical tags.
- Removed em dashes and en dashes from visible HTML text and metadata.
- Updated the shared inner-page header into a dynamic responsive three-column layout.
- Left-aligned header column content and set eyebrows to `--text-dim` gray.
- Added conditional vertical dividers for headers with descriptions.
- Applied consistent header behavior to Studio with `Launching Soon` as the left eyebrow.
- Removed the clock icon from Studio's `Launching Soon` eyebrow.
- Updated narrow page headers to stack eyebrow, title, and description in that order, left-aligned with no vertical dividers; CSS validation passed.
- Moved Studio's countdown below the portfolio disciplines and before the footer.
- Moved the pricing policy reopen button immediately before the quote CTA.
- Updated index quick links to `What We Do -> Services` and `Work With Us -> Pricing`.
- Added `AI_CONTEXT.md` and ignored it through `.gitignore`.

## Current open risks or follow-up items

- No automated local Git verification is available in the VS Code VFS context; run `git check-ignore -v AI_CONTEXT.md` in the real cloned repository.
- The Studio countdown date in `script.js` may still need confirmation before launch.
- Studio project cards remain placeholders until real portfolio images and case studies are available.
- The contact form depends on the configured Formspree endpoint remaining valid.
- Verify visual output at desktop and mobile widths after future header changes.

## Next AI starting state

A new AI should begin by:
1. Reading this file, `.gitignore`, and the current `git status`.
2. Checking the user's newest request against `Current session changes` and `Current open risks`.
3. Reading only the relevant HTML/CSS/JS section before editing.
4. Preserving existing page structure, shared components, copy style, responsive behavior, and local-only file status.
5. Updating this file immediately after each substantive session change.
6. Re-running focused validation and reporting the exact result.
7. Reminding the user to exclude `AI_CONTEXT.md` before commits and pushes.

## Handoff format for future sessions

Every future session should leave this file with:
- The date.
- Files changed.
- The exact behavior implemented.
- Verification performed.
- Known risks or unfinished work.
- The smallest logical next step.
