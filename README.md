# SONIQ Landing Page

A responsive product landing page for the SONIQ Aura One wireless headphones. Plain HTML, CSS and vanilla JavaScript. No build step or dependencies.

## Run it
Open `index.html` in Chrome (double-click it). Everything works from `file://`.

## Files
- `index.html` – page structure and content
- `style.css` – theme tokens, layout, responsive rules, animations
- `script.js` – theme toggle, mobile menu, pricing toggle, FAQ, slider, image fallback, scroll reveal

## Features
- Dark/Light mode, saved in `localStorage` (falls back to your system preference)
- Monthly/Yearly pricing toggle (prices edit via `data-monthly` / `data-yearly` in `index.html`)
- FAQ accordion with `aria-expanded`, usable by keyboard
- Testimonials slider with Previous/Next buttons; focus the slider and use the left/right arrow keys
- Animations disabled automatically under `prefers-reduced-motion`
- Hero image loads from Unsplash; if offline or blocked, an inline SVG headphones illustration is shown

## Notes
- Plan buttons show a confirmation message (demo only, no checkout).
- Social links point to the platforms' home pages; replace them with your own profiles.
