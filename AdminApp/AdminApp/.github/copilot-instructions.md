<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot instructions for this repository

This file gives concise, actionable context for AI coding agents working on this React + Vite project (located at the repository root).

Key facts
- Framework: React 19 + Vite (see `package.json` and `vite.config.js`).
- Routing: `react-router-dom` v7 with a RouterProvider; main routes are declared in `src/Routes/Router.jsx`.
- Styling: Tailwind CSS + custom `src/index.css` + Flowbite plugin (`tailwind.config.js`).
- ESLint: project includes eslint-related dependencies; lint script is `npm run lint`.

Where to start
- App entry: `src/main.jsx` — mounts `RouterProvider` and `HelmetProvider`.
- Shell layout: `src/Main/Main.jsx` (used as the root element for route children).
- Key pages/components: `src/Pages/Home1.jsx`, `src/Components/Rooms/Rooms.jsx`, `src/Components/Offers/Offers.jsx`, `src/Components/Facilities/Facilities.jsx`.

Build & developer workflows
- Start dev server with: `npm run dev` (runs `vite`); Vite provides HMR.
- Build for production: `npm run build` (runs `vite build`).
- Preview production build locally: `npm run preview` (runs `vite preview`).
- Lint: `npm run lint` (runs `eslint .`).

Project-specific conventions
- Router patterns: `src/Routes/Router.jsx` uses nested routes with `Main` as the root. Add new top-level pages as children of the root route.
- File layout: components live under `src/Components` and pages under `src/Pages`. Inner/feature pages are in `src/Pages/InnerPage`.
- Tailwind: custom classes and utilities are defined in `src/index.css` (contains many @apply utilities and project design tokens). Prefer using Tailwind utility classes and the existing custom classes (e.g., `.Container`, `.btn-primary`) to keep consistent layout.
- Images and static assets are in `public/` and served by Vite; use absolute paths like `/images/...` when referenced from CSS (see `index.css` which references `/images/...`).

Patterns and gotchas for code changes
- React Router v7: Routes are created with `createBrowserRouter` and used with `<RouterProvider router={router} />`. Changes to routes must update `src/Routes/Router.jsx` and any imports used there.
- Multiple similarly named files: there are several `home-*` image folders under `public/images`. Be exact when searching or editing asset paths.
- Helmet: the project uses `react-helmet-async` (and an older package `@dr.pogodin/react-helmet` is present). Prefer `react-helmet-async` usage as it's mounted in `src/main.jsx` via `HelmetProvider`.
- Styling precedence: Tailwind + custom CSS may conflict; `src/index.css` contains global rules using `@apply` and some CSS classes that act like design tokens (e.g., `.Container`, `.btn-primary`). When adding styles prefer Tailwind utilities first, then project classes.

Tests & CI
- No test runner or CI config found in the repository. If adding tests, prefer Jest or Vitest; document the new commands in `package.json` scripts.

External dependencies and integration points
- Flowbite (Tailwind component plugin) — configuration in `tailwind.config.js`.
- Swiper / Keen-slider / fslightbox used in various UI components. When modifying carousels, check `src/Components/*` for component-level initialization.

Example changes and references
- To add a new page at `/contact`: create `src/Pages/Contact.jsx`, import it in `src/Routes/Router.jsx`, and add a child route under `/` with `path: "contact"`.
- To add a Tailwind utility and reuse project container sizes: add new class to `src/index.css` using `@apply` and reference it in JSX.

Search hints for the agent
- Routing: search for `createBrowserRouter` or `RouterProvider` to find app entry and route definitions.
- Styling: search `@apply` or `.Container` in `src/index.css` to find shared layout utilities.
- Assets: use `public/` as the source of truth for static images; CSS references use root-relative URLs (e.g., `/images/...`).

When to ask the user
- Missing CI or test commands — ask which test runner or CI they prefer before adding.
- Unknown runtime environment (deploy target, environment variables) — ask for deploy details before changing config.

Keep edits minimal and local
- For UI changes, prefer component-level edits under `src/Components/*` and avoid modifying the large `src/index.css` unless adding small, shared utilities.

If you update this file
- Merge any preserved content and keep this document concise (20–50 lines). Mention files you changed when committing.

---
If anything here is unclear or you want me to expand on build/CI or create an initial test setup, tell me what test runner or CI you prefer and I'll update the repository accordingly.
