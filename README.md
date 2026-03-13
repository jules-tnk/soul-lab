# Soul Lab

A bilingual (EN/FR) garment design application built with React and Konva.js. Design clothing from scratch using modular SVG parts, customize fabrics, patterns, colors, and decorations — then get AI-powered suggestions and previews via OpenRouter.

## Features

- **Visual Design Editor** — Drag-and-drop canvas powered by Konva.js with transform controls, grouping, layering, grid snapping, and minimap navigation
- **24 Garment Types** — Shirts, blouses, dresses, trousers, skirts, outerwear and more, each with swappable parts (collars, sleeves, cuffs, pockets, necklines, hems...)
- **Parts Library** — Browse and swap garment components with live SVG previews and variant selection
- **Properties Panel** — Per-element controls for color, opacity, size, position, plus global design settings for fabric, pattern, and decorations
- **AI Design Preview** — Generate a realistic 3D visualization of your design on a mannequin using image generation via OpenRouter
- **AI Design Suggestions** — Chat with an AI assistant that knows your current design state and suggests fabrics, patterns, colors, and styling for specific occasions
- **Gallery** — Save, browse, search, and filter your designs with auto-generated thumbnails
- **Import / Export** — Serialize designs to JSON for sharing and backup
- **Undo / Redo** — Full canvas history with keyboard shortcuts
- **Bilingual** — Full English and French interface with instant switching

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + TypeScript 5.9 |
| Build | Vite 8 |
| Canvas | Konva + react-konva |
| Components | Chakra UI v2 |
| State | Zustand 5 (persisted to localStorage) |
| AI | OpenRouter SDK (google/gemini-3.1-flash-image-preview) |
| i18n | i18next + react-i18next |
| Routing | React Router v7 |

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Install & Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
pnpm build
pnpm preview
```

### AI Features

AI features require an [OpenRouter](https://openrouter.ai) API key. Enter it in the AI tab of the right sidebar panel. The key is stored locally in your browser and never sent anywhere except OpenRouter's API.

## Project Structure

```
src/
├── components/
│   ├── ai/          # AI panel, preview, suggestions chat
│   ├── atelier/     # Main editor page, action bar
│   ├── canvas/      # Konva design canvas, transform controls
│   ├── gallery/     # Design gallery with search & filters
│   ├── layout/      # App shell, top navigation
│   ├── properties/  # Properties panel (global, part, text, shape, image)
│   └── sidebar/     # Parts library, extras panel, templates
├── i18n/            # EN/FR translation files
├── services/        # OpenRouter API client
├── stores/          # Zustand state (design, AI, UI, canvas history)
├── types/           # TypeScript type definitions
└── utils/           # Prompts, canvas snapshot, import/export, templates
```

## Deployment

The app auto-deploys to GitHub Pages on push to `main` via the included workflow at `.github/workflows/deploy.yml`.

To set up:

1. Push the repo to GitHub
2. Go to **Settings > Pages**
3. Set source to **GitHub Actions**
4. Push to `main` — the workflow builds and deploys automatically

## License

All rights reserved.
