# Plan: Google Auth and Project Join
Requirements: ./requirements.md
Status: Approved

## Approach and decisions

We use Supabase Auth for Google OAuth (no custom auth server) and React Router v6 for routing. The frontend talks directly to Supabase from the browser using the `@supabase/supabase-js` client. Protected routes redirect unauthenticated users to `/login`.

**D1. How to generate and store the invite code** ✅ Option A chosen
- `invite_code` column (UUID) in the `projects` table. Generated at project creation. No expiry for v1.

**D2. OAuth pop-up vs. redirect** ✅ Option B chosen
- Full-page redirect (`redirectTo` option). Works everywhere including mobile Safari. Supabase's `onAuthStateChange` handles the session on return.

## Persistence

This feature stores:
| Table | Key columns | Rule from tech-stack |
|---|---|---|
| `projects` | `id`, `name`, `invite_code`, `created_at` | RLS: only members may read; only the creator may update invite_code |
| `project_members` | `project_id`, `user_id`, `joined_at` | RLS: only members of that project may read; insert open to any authenticated user (enforced by invite_code match in the application layer) |

> Migration files go in `supabase/migrations/` and are never edited after being applied (per tech-stack data rules).

## Affected files
- **Create:** `supabase/migrations/20261126000000_init.sql` — `projects` and `project_members` tables with RLS policies.
- **Create:** `.env.example` — documents `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Create:** `sistema/frontend/src/lib/supabaseClient.ts` — initializes and exports the Supabase client.
- **Create:** `sistema/frontend/src/pages/LoginPage.tsx` — sign-in screen with Google button.
- **Create:** `sistema/frontend/src/pages/DashboardPage.tsx` — project list + create/join prompt.
- **Create:** `sistema/frontend/src/pages/ProjectPage.tsx` — minimal project view (name + members).
- **Create:** `sistema/frontend/src/components/CreateOrJoinProject.tsx` — combined create/join form.
- **Modify:** `sistema/frontend/src/main.tsx` (or `App.tsx`) — add React Router routes and auth guard.
- **Modify:** `sistema/frontend/vite.config.ts` — ensure env vars are picked up.

## Tasks
1. **Infrastructure bootstrap**
   - [x] 1.1 Create `.env.example` and document required env vars. No tests (documentation only).
   - [x] 1.2 Write `supabase/migrations/20261126000000_init.sql`: `projects` table, `project_members` table, and RLS policies. No tests (manual verification via Supabase Studio).

2. **Supabase client**
   - [x] 2.1 Create `sistema/frontend/src/lib/supabaseClient.ts` that reads env vars and exports a typed client. Tests: unit test that the client is defined (covers R2 prerequisite).

3. **Auth flow**
   - [x] 3.1 Create `LoginPage.tsx` with the "Sign in with Google" button and silent-cancel behaviour. Tests: render test + simulate cancelled pop-up (covers R1, E4).
   - [ ] 3.2 Add an auth guard (protected route component). Tests: redirect-to-login when unauthenticated, redirect-to-dashboard when authenticated (covers R8).

4. **Dashboard and project creation**
   - [ ] 4.1 Create `DashboardPage.tsx` that lists the user's projects and shows the empty state with the combined prompt. Tests: render with empty list, render with projects (covers R3, R4).
   - [ ] 4.2 Create `CreateOrJoinProject.tsx` — "Create a project" form. Tests: empty-name validation, success creates project and navigates (covers R5, E3, E5).

5. **Join a project**
   - [ ] 5.1 Add "Join a project" to `CreateOrJoinProject.tsx`. Tests: invalid code shows error, duplicate join shows message, valid code adds member and navigates (covers R6, E1, E2, E5).

6. **Project page**
   - [ ] 6.1 Create `ProjectPage.tsx`: show project name and member list. Tests: renders name and members (covers R7).

7. **Sign-out**
   - [ ] 7.1 Add a sign-out button (header or nav). Tests: clicking it clears session and redirects to login (covers R9).

## Concepts likely new to the user
- **Row-Level Security (RLS):** PostgreSQL policies that run *inside the database* for every query. Even if someone gets the Supabase anon key, they cannot read data they are not authorized for because the DB itself rejects the query. We will explain when writing the migration.
- **OAuth pop-up / redirect dance:** Google auth happens on Google's servers; Supabase exchanges the result for a session. The `onAuthStateChange` listener is how the app knows the session arrived.
- **React Router protected routes:** A wrapper component that checks the auth state and renders children or `<Navigate>` to redirect. We will explain when writing that task.

## Rules check
- **Domain isolation:** Auth and project CRUD are UI/service concerns — no domain logic is introduced in this story. ✅
- **RLS:** Both tables will have RLS enabled from the first migration. ✅
- **No background jobs:** No cron or webhooks — invite code is a static column. ✅
- **No unapproved dependencies:** `@supabase/supabase-js` and `react-router-dom` ✅ approved by user.
- **Language:** UI copy in Spanish; code/identifiers in English. ✅
- **Folder layout:** Files placed under `sistema/frontend/src/`. ✅
- **Conflicts found:** None with the constitution.
