# Plan: Responsive Tailwind UI
Requirements: ./requirements.md
Status: Approved

## Approach and decisions
We will install and configure Tailwind CSS in `sistema/frontend` following modern Tailwind conventions (Vite + PostCSS / Tailwind), and integrate the typography (`Nunito` font) and design tokens specified in `DESIGN.md`. Then we will style the existing views (App shell, Login, Dashboard, Project, and Create/Join components) keeping all existing functional behavior, tests, and accessibility roles intact.

**D1. Tailwind configuration and design tokens** (Chosen: Option A)
- Option A (Direct Tailwind config extension): Install `tailwindcss`, `postcss`, `autoprefixer` and extend `tailwind.config.js` with exact semantic color names (`primary: '#2F6FED'`, `surface: '#F5F8FF'`, `surface-card: '#FFFFFF'`, `text-main: '#1E2A44'`, etc.) and load the `Nunito` font via Google Fonts in `index.html`.
  - Trade-off: Clean, standard Tailwind setup without extra runtime libraries; easily references semantic classes like `bg-surface`, `bg-primary`, `rounded-card`.
- Option B (Tailwind standard palette mapping): Use Tailwind default color utilities (e.g. `bg-blue-600`, `bg-slate-50`, `text-slate-900`) without custom design token names.
  - Trade-off: Zero custom theme config, but drifts away from the exact hex values and contrast guarantees in `DESIGN.md`.

**D2. Layout and App Shell Header** (Chosen: Option A)
- Option A (Unified Layout Shell): Wrap authenticated routes in an `AppLayout` component featuring a clean top navigation bar (logo/title "Tablero de grupos", back navigation when in project, and user sign-out action) with max-width 1200px container for page contents.
  - Trade-off: Consistent spacing and header across all authenticated views; leaves login isolated in its own focused page.
- Option B (Per-page header): Keep headers embedded directly inside each page component.
  - Trade-off: Repetitive layout code and higher risk of inconsistent styling across routes.

## Persistence (if applicable)
No database schema or migration changes. All data continues to be stored and queried via existing Supabase tables (`projects`, `project_members`).

## Affected files
- Create:
  - `sistema/frontend/tailwind.config.js`
  - `sistema/frontend/postcss.config.js`
  - `sistema/frontend/src/index.css` (Tailwind directives & base styles)
  - `sistema/frontend/src/components/AppLayout.tsx`
  - `sistema/frontend/src/components/AppLayout.test.tsx`
- Modify:
  - `sistema/frontend/package.json` (Tailwind devDependencies - requires user approval)
  - `sistema/frontend/index.html` (Nunito font import)
  - `sistema/frontend/src/main.tsx` (import `index.css`)
  - `sistema/frontend/src/App.tsx` (App layout integration)
  - `sistema/frontend/src/pages/LoginPage.tsx`
  - `sistema/frontend/src/pages/DashboardPage.tsx`
  - `sistema/frontend/src/pages/ProjectPage.tsx`
  - `sistema/frontend/src/components/CreateOrJoinProject.tsx`
  - Existing test files to ensure selectors and aria roles continue to pass.

## Tasks
1. Tailwind CSS and design token setup
   - [x] 1.1 Install `tailwindcss`, `postcss`, `autoprefixer` in `sistema/frontend` and configure theme tokens (colors, Nunito font, border radius) in `tailwind.config.js`, `postcss.config.js`, and `index.css`. Tests: build check and CSS generation. (covers R1)
2. App shell & Navigation
   - [ ] 2.1 Implement responsive `AppLayout` with top navigation bar, brand title, back navigation support, and sign out button. Tests: `AppLayout.test.tsx`, `App.test.tsx`. (covers R2, R3)
3. Login page styling
   - [ ] 3.1 Style `LoginPage` with centered responsive card, platform value proposition, and primary Google login button. Tests: `LoginPage.test.tsx`. (covers R4, E1)
4. Dashboard & Project forms styling
   - [ ] 4.1 Style `DashboardPage` and `CreateOrJoinProject` with responsive cards, form fields, action buttons, project grid, empty state, and alert messages. Tests: `DashboardPage.test.tsx`, `CreateOrJoinProject.test.tsx`. (covers R5, R6, R8, E2, E3, E4)
5. Project page header & metadata styling
   - [ ] 5.1 Style `ProjectPage` header, invite code copy pill, member badges, and placeholder workspace section. Tests: `ProjectPage.test.tsx`. (covers R7, R8, E1, E2)

## Concepts likely new to the user
- **Tailwind CSS Utility Classes:** Instead of writing custom CSS rules in separate stylesheets, Tailwind applies predefined utility classes (e.g. `flex`, `items-center`, `rounded-xl`, `bg-surface`) directly in the JSX markup for fast, consistent styling.
- **PostCSS:** A tool for transforming styles with JS plugins; Tailwind uses PostCSS to compile utility classes into the final bundled CSS during the Vite build.

## Rules check
Compliance with `specs/tech-stack.md`:
- Styling uses Tailwind CSS: Yes.
- Mobile and desktop responsive design: Yes.
- UI copy in Spanish: Yes.
- No unapproved dependencies without user consent: Tailwind (`tailwindcss`, `postcss`, `autoprefixer`) is explicitly listed in `tech-stack.md` ("Styling: Tailwind CSS") and approval is requested before installation.
- Existing tests pass and coverage is maintained: Yes.
