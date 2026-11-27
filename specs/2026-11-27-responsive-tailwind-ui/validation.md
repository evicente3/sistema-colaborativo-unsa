# Validation: Responsive Tailwind UI

## Automated
- Verification commands from `specs/tech-stack.md` pass:
  - `npm --prefix sistema/frontend test`
  - `npm --prefix sistema/frontend run build`
- [ ] Test: `LoginPage` renders styled container, heading, and login button (covers R1, R4)
- [ ] Test: `AppLayout` renders navigation bar, app title, and sign-out button (covers R2, R3)
- [ ] Test: `DashboardPage` renders project list grid and empty state with styled containers (covers R5, R6, E3)
- [ ] Test: `CreateOrJoinProject` renders styled cards, inputs, and error alerts (covers R5, R8, E4)
- [ ] Test: `ProjectPage` renders project header, invite code badge, and member list (covers R7, E2)

## Manual
1. **Responsive Mobile & Desktop Check:**
   - Open the app in browser at desktop width (1200px) and mobile width (375px).
   - Expected: Elements adapt cleanly without horizontal scrollbars, text clipping, or unstyled default HTML.
2. **Login View:**
   - Navigate to `/login` when unauthenticated.
   - Expected: Centered white card on pale blue background (`#F5F8FF`) with Nunito typography and primary blue Google sign-in button.
3. **Dashboard & Forms:**
   - Log in and view the dashboard.
   - Expected: Clean top bar with "Tablero de grupos" and sign-out button. Create project card and join project card are clearly laid out. Existing projects appear in a clean grid.
4. **Project Page & Invite Code:**
   - Enter a project.
   - Expected: Project title, back link to dashboard, invite code pill with copy action, and member list badges.

## Definition of done
- [ ] All requirements and edge cases have an automated or manual check
- [ ] Automated checks pass (`npm test`, `npm run build`)
- [ ] Manual visual inspection passes on desktop and mobile viewports
- [ ] Roadmap story ticked and spec linked in `specs/roadmap.md`

## What I learned
(filled in by feature-validate; approved by the user)
