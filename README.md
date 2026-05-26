# Kelvin O'Young — Personal Website

A clean, academic-style personal site built with plain HTML and CSS, inspired by
[Shengxiang Lin's site](https://shengxiang-lin.github.io/) and the
[academicpages](https://github.com/academicpages/academicpages.github.io) Jekyll theme —
but rewritten as a fully static site so it works on GitHub Pages out of the box (no
Ruby/Jekyll required).

## Sections

- **Short Bio** — who I am, what I work on
- **Education** — Louisiana State University, B.S. Electrical Engineering (Honors)
- **Experience** — Biomedical Engineering Device Lab + TigerRacing Formula SAE
- **Skills** — hardware/EDA, programming, and general
- **Honors & Awards**
- **Interests**
- **Projects Timeline** — chronological cards, each linking to a full project write-up

## Project Pages

Each project in the timeline has its own page under `projects/`:

- `projects/cancer-detection-probe.html`
- `projects/offset-pcb.html`
- `projects/bms-protection-board.html`
- `projects/fpga-elevator.html`
- `projects/ai-text-guard.html`
- `projects/food-guesser.html`

To add a new project:

1. Drop a new image into `assets/images/projects/`.
2. Copy one of the existing `projects/*.html` files as a template.
3. Add a new `<li class="timeline-item">` block to the timeline section of
   `index.html`, pointing at your new image and HTML page.

## File Structure

```
.
├── index.html                  # Main landing page
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css           # All styling
│   └── images/
│       ├── favicon.svg
│       ├── profile.svg         # Placeholder profile picture
│       └── projects/           # Placeholder project images
│           ├── cancer-probe.svg
│           ├── offset-pcb.svg
│           ├── bms-board.svg
│           ├── fpga-elevator.svg
│           ├── ai-text-guard.svg
│           └── food-guesser.svg
└── projects/                   # Per-project detail pages
    ├── cancer-detection-probe.html
    ├── offset-pcb.html
    ├── bms-protection-board.html
    ├── fpga-elevator.html
    ├── ai-text-guard.html
    └── food-guesser.html
```

## Local Preview

You don't need any build tools. Just open `index.html` in a browser, or run a tiny
local server so relative paths behave like they will on GitHub Pages:

```powershell
# Python 3 (built-in)
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publishing on GitHub Pages

This repo is named `KelvinO123` (your username's repo). To turn it into your personal
GitHub Pages site:

### Option A — User site (recommended, gives you `kelvino123.github.io`)

1. Create a new repository named exactly **`KelvinO123.github.io`** on GitHub.
2. From this folder, push the code there:

   ```powershell
   git init
   git add .
   git commit -m "Initial personal site"
   git branch -M main
   git remote add origin https://github.com/KelvinO123/KelvinO123.github.io.git
   git push -u origin main
   ```

3. In the repo on GitHub, go to **Settings → Pages** and confirm the source is
   **`main` branch / root**.
4. Your site will be live at `https://kelvino123.github.io` within a minute or two.

### Option B — Project site (URL becomes `kelvino123.github.io/KelvinO123`)

1. Push this repo as-is.
2. In **Settings → Pages**, set the source to **`main` branch / root**.
3. Your site will be live at `https://kelvino123.github.io/KelvinO123`.

> If you go with Option B, the relative links (`assets/...`, `projects/...`) will still
> work fine because everything is referenced relatively.

## Customizing

- **Replace the profile photo:** swap `assets/images/profile.svg` with a real headshot
  (e.g. `profile.jpg`) and update the `<img src="...">` in `index.html`.
- **Replace project images:** drop real photos / renders into `assets/images/projects/`
  and update the corresponding `<img>` tags in `index.html` and each project page.
- **Change accent color:** edit the CSS custom properties at the top of
  `assets/css/style.css` (`--color-accent`, `--color-accent-soft`, etc.).
- **Edit copy:** all of the bio, education, experience, awards, and project text lives
  directly in `index.html` and the individual `projects/*.html` files. No CMS, no build —
  just open and edit.

## Tech

- HTML5
- CSS3 (custom properties, CSS Grid, Flexbox)
- A tiny bit of vanilla JavaScript (just to fill in the footer year)
- Google Fonts — Lato + Source Serif 4
