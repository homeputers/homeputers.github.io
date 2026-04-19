# Homeputers LLC Website

## Overview
Static website for Homeputers LLC, a software and infrastructure consulting firm. Clean, responsive single-page landing site with supplementary privacy and terms pages.

## Project Structure
- `index.html` — Main landing page
- `privacy.html` — Privacy Policy page
- `terms.html` — Terms of Service page
- `assets/styles.css` — Main stylesheet (dark-mode-first with light-mode support)
- `assets/logo.svg` — Company logo
- `assets/favicon.svg` — Website favicon
- `robots.txt` — Search engine instructions
- `sitemap.xml` — SEO sitemap
- `CNAME` — Custom domain configuration (homeputers.com)

## Technologies
- Plain HTML5, CSS3, minimal vanilla JavaScript
- No build system or package manager required

## Running the App
- Served with Python's built-in HTTP server on port 5000
- Workflow: `python3 -m http.server 5000 --bind 0.0.0.0`

## Deployment
- Type: Static site
- Public directory: `.` (project root)
