# Yashwanth R P — The Pull of Light (3D portfolio)
React + Vite + React Three Fiber + Framer Motion. Pull the lamp cord (drag, tap the button, or press Enter) to reveal the portfolio.

## Run
`npm install && npm run dev`  ·  `npm run build`

## Customize
All content, links and email are in `src/data.js`. Links set to `null` render as disabled "coming soon" buttons (nothing is invented).
Put your resume at `public/resume.pdf` and a photo in `public/` (then set `CONFIG.photo`). Add projects by appending to `PROJECTS`.

## Deploy to GitHub Pages
1. Push to a repo's `main` branch (base path auto-derives from the repo name in the workflow).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Push again (or run the workflow manually). Site: `https://<user>.github.io/<repo>/`.
Local base override: `VITE_BASE=/other-name/ npm run build`. Custom domain: `VITE_BASE=/`.
The workflow copies `index.html` to `404.html` so refreshes never 404.
