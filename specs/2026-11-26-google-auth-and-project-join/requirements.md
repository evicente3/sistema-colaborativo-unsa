# Requirements: Google Auth and Project Join
Status: Draft

## Story
As a group member, I want to sign in with Google and create or join a project via invite link or code, so that my group has a shared workspace.

## Purpose
This is the entry point of the entire app. Without authentication there is no identity, and without a shared project there is no workspace. Every other feature builds on top of this. Getting it right means all future work has a stable foundation with proper security (RLS) from day one.

## Scope
**In:**
- Google OAuth sign-in via Supabase Auth (pop-up or redirect flow).
- Supabase project bootstrap: creating the Supabase project, enabling Google OAuth, and documenting the env vars needed (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- After sign-in, the user lands on a **Dashboard** that shows their projects.
- If the user has no projects, the Dashboard shows an empty state with a combined **Create or Join** prompt on the same screen.
- **Create a project**: user enters a name → system creates the project and generates a unique invite code → project appears in the user's dashboard.
- **Join a project**: user enters an invite code → system adds the user as a member → project appears in the user's dashboard.
- After creating or joining, the user is taken to a minimal **Project Page** (project name + member list; no tasks yet).
- Signing out clears the session and returns to the sign-in screen.

**Out:**
- Invite *links* (URL with embedded code) — plain code is enough for v1.
- Task creation or Kanban board (next stories).
- Role differentiation between members (all members are equal per mission).
- Email/password auth or any provider other than Google.
- Password reset, email verification flows.

## Behavior
- **R1.** An unauthenticated user who opens the app sees only a sign-in screen with a "Sign in with Google" button.
- **R2.** Clicking "Sign in with Google" opens the Google OAuth flow. On success the user is redirected to the Dashboard.
- **R3.** The Dashboard lists all projects the signed-in user belongs to (empty state when there are none).
- **R4.** The empty-state / Dashboard shows a combined prompt with two options: "Create a project" and "Join a project".
- **R5.** Submitting "Create a project" with a non-empty name creates a new project record, generates a unique invite code, adds the creator as a member, and navigates to the Project Page.
- **R6.** Submitting "Join a project" with a valid invite code adds the user as a member of that project and navigates to its Project Page.
- **R7.** The Project Page shows the project name and the list of current members (display name + avatar/email).
- **R8.** A signed-in user who navigates to `/` is redirected to the Dashboard; an unauthenticated user who navigates to any protected route is redirected to the sign-in screen.
- **R9.** Signing out clears the Supabase session and returns to the sign-in screen.

## Edge cases
- **E1.** Entering a non-existent or expired invite code shows an inline error: "Código de invitación no válido."
- **E2.** A user who is already a member of a project and tries to join again with the same code receives an informative message instead of a duplicate membership.
- **E3.** Creating a project with an empty or whitespace-only name is rejected with an inline validation message before the network call is made.
- **E4.** If the Google OAuth pop-up is closed or cancelled by the user, the sign-in screen stays visible with no error (silent cancel).
- **E5.** If the Supabase call fails (network error), the UI shows a generic error message and allows retry; no partial state is left.

## Open questions
- (must be empty before Status: Approved)
