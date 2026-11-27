# Requirements: Responsive Tailwind UI
Status: Approved

## Story
As a group member, I want a clean, responsive Tailwind UI for login, dashboard, and project pages, so that the shared workspace is presentable and easy to use on mobile and desktop.

## Purpose
The walking skeleton delivered functional authentication, project creation, and project joining, but used unstyled browser defaults. Styling these views with a friendly, cohesive visual system (soft base, vibrant accents, rounded cards) makes the workspace comfortable to navigate on smartphones and desktop browsers, setting the visual foundation for the upcoming task board.

## Scope
**In:**
- Configure the visual design system tokens (palette, Nunito font, border radiuses, spacing) in Tailwind CSS matching the project design guidelines.
- Responsive app shell / header containing brand identity ("Tablero de grupos"), session info / navigation, and a sign-out action.
- Styled Login page: centered card on mobile/desktop with clear product headline, value proposition, and Google sign-in action button.
- Styled Dashboard page: responsive container (max 1200px), welcoming header, project creation card, invite-code join card, and responsive grid of project cards (or friendly empty state when no projects exist).
- Styled Project page: header with project title, invite code badge with one-click copy, member list badges/chips, and navigation back to dashboard.
- Clear, accessible alerts (error states, loading states, empty states) with proper contrast and icon/text indicators.

**Out:**
- Kanban board columns and task cards (reserved for the next story in the roadmap).
- Real-time task progress bar and urgency alert chips (reserved for the task and alert stories).
- Mini Gantt / Cronograma view.
- User profile editing or settings views.

## Behavior
- **R1. Visual design tokens:** The application uses a soft blue surface background (`#F5F8FF`), clean white surface cards (`#FFFFFF`), primary blue (`#2F6FED`) for key actions, dark blue text (`#1E2A44`) with high contrast, and rounded corners (12px on cards, 8px on buttons and form inputs).
- **R2. Responsive layout:** All views adapt fluidly from mobile viewports (minimum 360px width) to desktop viewports (up to 1200px centered container) without horizontal overflow or clipped text.
- **R3. Navigation & App Shell:** Authenticated users see a clean top bar with app title, user indicator, and a secondary action button to sign out. On project pages, users can navigate back to the dashboard.
- **R4. Login view:** Unauthenticated users see a welcoming, focused card explaining the platform's purpose and a primary button to sign in with Google.
- **R5. Dashboard view:** Displays user projects in a responsive grid. Each project card displays the project title and a link to enter. Project creation and project joining forms are organized in clean, side-by-side or stacked cards with clear labels, input fields, and action buttons.
- **R6. Empty state:** When the user has no projects, the dashboard shows a friendly empty state message explaining how to get started (create or join a project).
- **R7. Project view header:** Displays the project name, an invite code display with copy feedback, and a member list section showing participants.
- **R8. Feedback & alerts:** Loading states, inline validation errors, and network failure alerts are styled with distinct alert containers with accessible text contrast and clear recovery options.

## Edge cases
- **E1. Mobile small viewport (360px):** Form fields, buttons, and invite codes stay within screen boundaries and wrap gracefully without breaking layout.
- **E2. Long project names:** Long project titles wrap cleanly in project cards and project headers without overflowing container bounds.
- **E3. Empty project list:** Handled with a dedicated empty state container rather than an empty blank space.
- **E4. Form errors and validation:** Error messages appear in dedicated soft-red containers with high-contrast text directly below or within the relevant form card.

## Open questions
(None)
