# Homeputers LLC Website

## Overview
Professional consulting website for Homeputers LLC built with Astro. Features a dark-themed design with teal accents, serving pages for the main landing, privacy policy, and terms of service.

## Tech Stack
- **Framework**: Astro (v5+)
- **Styling**: Scoped CSS in Astro components + global CSS
- **Fonts**: Inter via Google Fonts
- **Runtime**: Node.js 22

## Project Structure
```
src/
  layouts/BaseLayout.astro   # HTML shell with SEO meta tags
  pages/
    index.astro              # Main landing page
    privacy.astro            # Privacy Policy
    terms.astro              # Terms of Service
  components/
    Header.astro             # Sticky nav with mobile menu
    Footer.astro             # Footer with links
  styles/global.css          # Design tokens and base styles
public/
  logo.png                   # Full Homeputers logo (with text)
  logo-icon.png              # Icon-only logo
  favicon.svg                # SVG favicon
  CNAME                      # Custom domain: homeputers.com
  robots.txt                 # SEO
.github/
  workflows/deploy.yml       # GitHub Actions → GitHub Pages deployment
```

## Running the App
- **Dev**: `npm run dev` → http://localhost:5000
- **Build**: `npm run build` → output in `dist/`
- Workflow: "Start application" runs `npm run dev` on port 5000

## Deployment
- **Replit**: Static deployment with `publicDir: "dist"`
- **GitHub Pages**: Automated via `.github/workflows/deploy.yml` on push to `main`
  - Enable GitHub Pages with "GitHub Actions" source in repo Settings → Pages
  - Custom domain: homeputers.com (CNAME already in public/)

## Brand Colors
- Background: `#080c12`
- Accent (teal): `#2dd4bf`
- Text: `#e2e8f0`
- Surface: `#111827`
