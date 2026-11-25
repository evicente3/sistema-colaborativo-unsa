# Tech Stack

## Stack
- **Frontend:** React + TypeScript (responsive web for mobile and desktop, under `sistema/frontend/`).
- **Styling:** Tailwind CSS (fast responsive UI without custom CSS overhead).
- **Backend & Auth:** Supabase (PostgreSQL, Google OAuth, Row-Level Security).
- **Domain logic:** Pure TypeScript module (`sistema/frontend/src/domain/`), independent of React and Supabase, unit-tested with Vitest.

## Architecture rules (never violate)
- **Domain isolation:** Precedence/cycle detection, automatic task blocking, critical path, and alert calculations live in pure TypeScript functions with zero imports from React, DOM, or Supabase.
- **Database authorization:** Every table uses Supabase Row-Level Security (RLS) so users can only read/write projects they belong to.
- **No external cron or background jobs:** Alerts are computed on login/load from current task state.
- **No unapproved dependencies:** Add new npm packages only after explicit user approval.

## Data rules
- **Source of truth:** SQL migration files in `supabase/migrations/` (to be created when Supabase is initialized).
- **Migration discipline:** Never edit an already-applied migration; create a new migration file for schema changes.
- **Reference docs:** `docs/VISION.md` and `README.md` are reference context only (note: `README.md` mentions FastAPI in `sistema/backend/`, which is superseded by Supabase per `docs/VISION.md`).
- **Permissions:** Any member of a project can create, edit, reassign, and update deadlines for tasks in that project.

## Conventions
- **Language:** Specs, code, identifiers, and commit messages in English; all user-facing UI copy in Spanish.
- **Folder layout:** App code under `sistema/frontend/`; domain module under `sistema/frontend/src/domain/`; tests alongside domain/feature modules.
- **Error handling:** Validate inputs and handle Supabase/network errors at UI/service boundaries; keep domain functions throwing typed errors or returning explicit result objects.

## Verification commands
| Command | Run from | Status |
|---|---|---|
| `npm run test` (Vitest) | `sistema/frontend` | to configure |
| `npm run build` (`tsc && vite build`) | `sistema/frontend` | to configure |
| `npm run lint` | `sistema/frontend` | to configure |

## Git
- Never work on `main`. Use `feat/<story>` for features and `docs/<name>` for documentation.
- Atomic commits with Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`).
- Merge via pull request (or local merge) only after `feature-validate` passes.
