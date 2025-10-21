# Disp.bzk – Vortex Shedding Exemption Verifier

[![Live Demo](https://img.shields.io/badge/Online%20Demo-Available-green?logo=github)](https://disp.bzk.dev.br)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Disp.bzk** is a lightweight, single-page application and open-source structural wind verification tool designed to assess exemption from vortex shedding checks according to the 2023 revision of the Brazilian Standard NBR 6123, developed as part of an academic capstone project.

---

## Features

- Calculates slenderness, structural wind speed (Vest) and critical vortex speed (Vcr)
- Interactive chart with real-time results plotted
- Markdown-based report with PDF export (via `html2pdf.js`)
- Wizard-style help interface with 15 guided tooltips (Markdown-powered)
- Validations for geometric and aerodynamic parameters
- Fully tested using Jest and Cypress (unit and E2E)
- Deployable as a static SPA via GitHub Pages

---

## Tech Stack

- **TypeScript** (modular codebase)
- **Vite** (build & local dev server)
- **Jest** (unit testing)
- **Cypress** (end-to-end testing)
- **Chart.js** (dynamic graphing)
- **Marked** (Markdown rendering)
- **html2pdf.js** (PDF export)
- **GitHub Pages** (deployment)

---

## Folder Structure

```
assets/
 ├── wizard/                 # Tooltip markdown steps
 ├── result-*.md             # Output templates
 ├── license.md              # MIT license text
 └── info.md                 # Info about the software


src/
 ├── main.ts                 # Entry point
 ├── calculation.ts          # Computes key structural parameters
 ├── input.ts                # Verifies and validates entries
 ├── output.ts               # Handles results and rendering
 ├── utils/                  # DOM, formatting, validation, etc.
 └── wizard.ts               # Guided interface logic
```

---

## Running Locally

1. Clone the repository:
```bash
git clone https://github.com/burdzaki/projeto-disp.git
cd projeto-disp
```

2. Install dependencies:
```bash
npm install
```

3. Run the local server:
```bash
npm run dev
```
Open `http://localhost:4000` in your browser.

---

## Building for Production

```bash
npm run build
```

To deploy to GitHub Pages, make sure the `vite.config.ts` file has:

```ts
export default defineConfig({
  base: '/projeto-disp/',
  // ...
})
```

---

## License

This project is licensed under the MIT License — see the [LICENSE.md](./LICENSE.md) file for details.

---

## Author

Developed by **Alana Burdzaki**, Civil Engineer @ UFSC & pursuing an MBA in Software Engineering @ USP/ESALQ.
