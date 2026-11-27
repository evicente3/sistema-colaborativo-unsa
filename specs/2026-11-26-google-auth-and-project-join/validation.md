# Validation: Google Auth and Project Join

## Automated
Verification commands from `specs/tech-stack.md`:
- `npm run test` passes (Vitest, run from `sistema/frontend/`)
- `npm run build` passes (tsc + vite build, run from `sistema/frontend/`)
- `npm run lint` passes

Specific tests:
- [x] Supabase client is defined and exports a non-null client. (covers R2 prerequisite)
- [x] `<LoginPage>` renders a "Sign in with Google" button. (covers R1)
- [x] `<LoginPage>` does not show an error when the OAuth pop-up is cancelled. (covers E4)
- [x] Auth guard redirects unauthenticated users to `/login`. (covers R8)
- [x] Auth guard does NOT redirect authenticated users. (covers R8)
- [x] `<DashboardPage>` renders empty state when user has no projects. (covers R3, R4)
- [x] `<DashboardPage>` renders project list when user has projects. (covers R3)
- [x] `<CreateOrJoinProject>` shows an inline error when project name is empty on submit. (covers E3)
- [x] `<CreateOrJoinProject>` calls create-project service and navigates on valid name. (covers R5)
- [x] `<CreateOrJoinProject>` shows "Código de invitación no válido." for a non-existent code. (covers E1)
- [x] `<CreateOrJoinProject>` shows an informative message for a duplicate join attempt. (covers E2)
- [x] `<CreateOrJoinProject>` calls join-project service and navigates on valid code. (covers R6)
- [x] `<CreateOrJoinProject>` shows a generic error when the network call fails. (covers E5)
- [x] `<ProjectPage>` renders the project name and member list. (covers R7)
- [x] Sign-out button clears session and navigates to `/login`. (covers R9)

## Manual
1. Open the app unauthenticated → expect: sign-in screen with "Sign in with Google" button, no other content.
2. Click "Sign in with Google" → complete the Google OAuth → expect: land on Dashboard.
3. Dashboard is empty → expect: combined "Crear proyecto" / "Unirse a un proyecto" prompt visible.
4. Create a project with the name "Proyecto UNSA" → expect: navigated to Project Page; project name shown; your account listed as a member.
5. Open a second browser session / incognito, sign in as another Google account, go to Dashboard → enter the invite code from step 4 → expect: navigated to the same Project Page with both members shown.
6. Enter a fake invite code (e.g. "XXXXX") → expect: inline error "Código de invitación no válido."
7. Try to join the same project again with the same code → expect: informative message, no duplicate member added.
8. Click sign-out → expect: redirected to sign-in screen; navigating back to `/dashboard` redirects to `/login`.
9. Try to navigate directly to `/dashboard` while unauthenticated → expect: redirected to `/login`.

## Definition of done
- [x] All automated tests listed above pass (`npm run test`)
- [x] `npm run build` succeeds with no TypeScript errors
- [ ] `npm run lint` passes
- [x] All manual checks above pass end-to-end (requires a live Supabase project)
- [x] `.env.example` documents every required env var
- [x] `supabase/migrations/` has the initial migration with RLS enabled
- [x] Roadmap story ticked and spec linked

## What I learned
- I learned that Row-Level Security (RLS) enforces authorization inside PostgreSQL itself, so even with a public anon key users can only read projects they belong to.
- I learned that `SECURITY DEFINER` RPC functions let us safely perform controlled operations (like looking up a project by `invite_code` or reading member profiles from `auth.users`) without weakening table-level RLS.
- I learned that Supabase's `onAuthStateChange` listener keeps React's auth state in sync across OAuth redirects and sign-out, letting route guards handle redirects declaratively.
- I learned that mocking Supabase in Vitest proves UI state and error handling, while manual checks against a live project are still required to verify SQL migrations and RLS.
