# Validation: Google Auth and Project Join

## Automated
Verification commands from `specs/tech-stack.md`:
- `npm run test` passes (Vitest, run from `sistema/frontend/`)
- `npm run build` passes (tsc + vite build, run from `sistema/frontend/`)
- `npm run lint` passes

Specific tests:
- [ ] Supabase client is defined and exports a non-null client. (covers R2 prerequisite)
- [ ] `<LoginPage>` renders a "Sign in with Google" button. (covers R1)
- [ ] `<LoginPage>` does not show an error when the OAuth pop-up is cancelled. (covers E4)
- [ ] Auth guard redirects unauthenticated users to `/login`. (covers R8)
- [ ] Auth guard does NOT redirect authenticated users. (covers R8)
- [ ] `<DashboardPage>` renders empty state when user has no projects. (covers R3, R4)
- [ ] `<DashboardPage>` renders project list when user has projects. (covers R3)
- [ ] `<CreateOrJoinProject>` shows an inline error when project name is empty on submit. (covers E3)
- [ ] `<CreateOrJoinProject>` calls create-project service and navigates on valid name. (covers R5)
- [ ] `<CreateOrJoinProject>` shows "Código de invitación no válido." for a non-existent code. (covers E1)
- [ ] `<CreateOrJoinProject>` shows an informative message for a duplicate join attempt. (covers E2)
- [ ] `<CreateOrJoinProject>` calls join-project service and navigates on valid code. (covers R6)
- [ ] `<CreateOrJoinProject>` shows a generic error when the network call fails. (covers E5)
- [ ] `<ProjectPage>` renders the project name and member list. (covers R7)
- [ ] Sign-out button clears session and navigates to `/login`. (covers R9)

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
- [ ] All automated tests listed above pass (`npm run test`)
- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] `npm run lint` passes
- [ ] All manual checks above pass end-to-end (requires a live Supabase project)
- [ ] `.env.example` documents every required env var
- [ ] `supabase/migrations/` has the initial migration with RLS enabled
- [ ] Roadmap story ticked and spec linked

## What I learned
(filled in by feature-validate; approved by the user)
