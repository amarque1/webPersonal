# Personal Portfolio — Creative Developer & Game Artist

A futuristic, dark, editorial personal portfolio website engineered specifically for video game developers and digital artists.

Designed to represent two complementary professional identities:
1. **Technical Mindset:** Gameplay systems, physics simulation, Unity, C#, state machines, procedural generation, and clean software architecture.
2. **Artistic Mindset:** 3D modelling, Blender, PBR texturing, lighting, animation, level design, and visual art direction.

Built exclusively with **HTML5, CSS3, and Vanilla JavaScript** — zero external framework bloat, fully responsive, and pre-configured for automated **GitHub Pages** deployment via GitHub Actions.

---

## 🚀 Live Demo & Repository

- **Repository:** [https://github.com/amarque1/webPersonal](https://github.com/amarque1/webPersonal)
- **GitHub Pages URL:** `https://amarque1.github.io/webPersonal/`

---

## 🛠️ Technology Stack

- **HTML5:** Semantic architecture, accessible landmarks (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`), ARIA attributes, skip-link.
- **CSS3:** Custom properties (CSS variables), CSS Grid & Flexbox, clamp typography, backdrop filters, keyframe animations, `@media (prefers-reduced-motion)`.
- **Vanilla JavaScript (ES6+):**
  - Modular structure (`i18n.js`, `particles.js`, `interactions.js`, `main.js`).
  - **Multi-language internationalization (i18n):** Full tri-lingual support (Català, Español, English) with automatic browser detection, English fallback, and persistent choice via `localStorage`.
  - Interactive HTML Canvas particle system with mouse proximity, trail physics, touch support, and adaptive density.
  - Dual-identity profile inspector with interactive focus switching.
  - Accessible modal dialog for architectural project breakdowns.
  - Custom desktop cursor follower with magnetic element states.
  - Sticky glassmorphic navigation with scroll spy and mobile drawer.
  - Real-time HUD system status telemetry (live clock, coordinates, FPS counter).
  - Clipboard copy utility with animated toast notifications.

---

## 📁 Project Structure

```text
webPersonal/
├── index.html                   # Main semantic entry point
├── README.md                    # Documentation & deployment guide
├── .gitignore                   # Standard git exclusions
├── .nojekyll                    # Ensures GitHub Pages serves all assets
├── assets/
│   ├── cv/
│   │   └── cv-placeholder.pdf   # Local PDF resume placeholder
│   ├── icons/
│   │   ├── check.svg            # Success checkmark icon
│   │   ├── copy.svg             # Clipboard copy icon
│   │   ├── cube.svg             # 3D cube / Blender icon
│   │   ├── cv.svg               # Resume / document icon
│   │   ├── email.svg            # Mail icon
│   │   ├── external.svg         # Outbound link icon
│   │   ├── github.svg           # GitHub brand icon
│   │   ├── itchio.svg           # itch.io brand icon
│   │   ├── linkedin.svg         # LinkedIn brand icon
│   │   └── terminal.svg         # Code / terminal icon
│   └── images/
│       ├── avatar-placeholder.svg      # Geometric cybernetic personal emblem
│       ├── project-chronoshift.svg     # Project 1: Kinematic trajectory blueprint
│       ├── project-neoruins.svg        # Project 2: Cyberpunk 3D environment
│       └── project-odyssey.svg         # Project 3: Procedural shader node graph
├── css/
│   ├── style.css                # Design system, layout, typography, components
│   └── animations.css           # Keyframes, cursor, scroll-reveal, reduced-motion
├── js/
│   ├── i18n.js                  # Internationalization engine (CA, ES, EN) & auto-detection
│   ├── main.js                  # Nav, scroll-spy, mobile drawer, HUD telemetry
│   ├── particles.js             # Canvas particle background with proximity & physics
│   └── interactions.js          # Custom cursor, dual-profile switcher, modal, copy
└── .github/
    └── workflows/
        └── deploy.yml           # Automated GitHub Pages CI/CD workflow
```

---

## 🌍 Multi-language & Browser Detection (i18n)

The website natively supports three languages:
- **Català (`ca`)**
- **Castellà / Español (`es`)**
- **Anglès / English (`en`)**

### How automatic language detection works:
1. **User Override:** If the user previously clicked a language button (`CA`, `ES`, `EN`), that preference is saved in `localStorage` and always takes priority.
2. **Browser Adaptation:** If no saved preference exists, the site inspects `navigator.languages` and `navigator.language` to match against `ca`, `es`, or `en`.
3. **Fallback Behavior (Què passa si l'idioma no és cap d'aquests 3?):**
   - If a visitor arrives whose browser is set to any unsupported language (e.g. French, German, Japanese, Portuguese, etc.), the system automatically **falls back to English (`en`)**, the universal standard in game development and international tech hiring.
   - The user can still switch to Català or Castellà at any time using the header switcher pills.

---

## 🌐 Enabling GitHub Pages Deployment

This project includes a production-ready GitHub Actions deployment workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

To activate automated deployment on your GitHub repository:

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete creative developer & game artist portfolio"
   git push origin main
   ```
2. Navigate to your repository on GitHub:
   `https://github.com/amarque1/webPersonal`
3. Click on **Settings** (tab at the top right of the repo).
4. In the left sidebar, under **Code and automation**, click on **Pages**.
5. Under **Build and deployment**:
   - Set **Source** to **GitHub Actions**.
6. The workflow `.github/workflows/deploy.yml` will automatically trigger on pushes to `main` and publish your site at:
   ```text
   https://amarque1.github.io/webPersonal/
   ```
7. You can also manually trigger a deployment at any time under **Actions > Deploy to GitHub Pages > Run workflow**.

---

## 💻 Local Preview & Development

Because this is a static website, you can run and preview it immediately without installing heavy frameworks:

### Option A: Using Python (Built-in)
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option B: Using Node / npx
```bash
npx serve .
```

### Option C: VS Code Live Server
Right-click on `index.html` and select **Open with Live Server**.

---

## ✏️ Customization Guide

### 1. Personal Identity & Bio
- Open `index.html`.
- Search for `CREATIVE DEVELOPER` or `GD` and update the brand initials and titles.
- Update the hero section headline and intro bio paragraph in `<p class="hero-bio">`.
- Update the About Me narrative paragraphs in `<div class="about-narrative">`.

### 2. Resume / CV
- Place your resume in `assets/cv/` (e.g. `assets/cv/cv-placeholder.pdf` or rename to your desired filename).
- Update the `href` attribute of the CV buttons in `index.html` if you change the file path.

### 3. Contact & Social Links
- In `index.html`, search for `developer@example.com` and replace with your real contact email.
- Update the LinkedIn, GitHub, and itch.io URL links in the contact cards.

### 4. Adding or Editing Projects
- Project entries are located in the `<div class="projects-feed">` section of `index.html`.
- To add your own game screenshots, replace the SVG placeholders in `assets/images/` with your game screenshots (`.png`, `.webp`, `.jpg`).
- Update the corresponding project details in `js/interactions.js` inside the `projectsData` dictionary to customize the interactive architectural modal content for each game.

---

## ♿ Accessibility & Performance

- **Reduced Motion Support:** Respects `prefers-reduced-motion: reduce` by disabling smooth scroll loops, disabling the custom cursor, and rendering elements immediately without animation delays.
- **Responsive Layout:** Optimized with dedicated layouts for 4K/desktop, tablet, and mobile screens.
- **Battery & GPU Preservation:** The particle canvas automatically pauses its `requestAnimationFrame` loop when the browser tab is hidden or when the hero section scrolls out of view.
