# TGM Accounting & Auditing — website

Static website for TGM Accounting & Auditing LLC, Dubai. Plain HTML and CSS, no build step. Hosted on Vercel; every push to `main` publishes the site.

## Pages

- `/` — home (desert-to-skyline hero, services, UAE–Africa corridor, partners)
- `/services/*` — eight service pages
- `/partners` — full partner profiles
- `/contact` — email, phone, WhatsApp, office

## Still to fill

- Trade licence number (footer, every page)
- Arabic version
- Individual sub-service pages for search

## Editing

Page content lives in `_build/build.py`. Run `python3 _build/build.py .` from the repo root to regenerate the HTML, then commit. `_build` is not published (see `.vercelignore`).
