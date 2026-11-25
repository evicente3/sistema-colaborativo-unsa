# Mission

## Core idea
A flexible, mobile- and desktop-friendly web app for small groups to organize and track collaborative work. Every task has an assignee, deadline, status, and optional dependencies; the system automatically blocks tasks with unfinished predecessors and surfaces in-app alerts when delays threaten dependent work.

## Audience
Any small group sharing a goal and coordinating activities (study teams, volunteering, event organizing, startups, professional work). The app is domain-neutral and requires no technical background.

## Domain terms
- **Project:** A shared workspace with a goal, an invite code/link, and a set of tasks managed by its members.
- **Task:** A unit of work with a title, assignee, deadline, status (Kanban column), and optional predecessor tasks.
- **Precedence / Dependency:** A directed link where Task B cannot start or complete until predecessor Task A is finished; cycles are forbidden.
- **Blocked task:** A task with at least one unfinished predecessor; blocked automatically by domain rules.
- **Critical path:** The sequence of dependent tasks whose delay delays the overall project.
- **In-app alert:** A warning computed on login (no background jobs) highlighting due/overdue tasks, delayed tasks blocking others, or column accumulation.

## Principles
- **Simplicity over completeness:** Keep the UI and workflows lightweight; neutral, domain-agnostic language.
- **Guided, not rigid:** Offer a 15-activity collaborative flow as an optional guide; groups skip what they do not need.
- **Equal participation & group-only visibility:** All project members can create, edit, reassign, and update deadlines; contribution summaries stay private to the group (never shared with external evaluators) to protect cohesion.
- **Strict domain isolation:** Dependency, blocking, critical path, and alert rules live in a pure module independent of UI and database.

## v1 scope
- Google account sign-in; create a project and join via invite code or link.
- Tasks with assignee, deadline, status, and precedence links (with cycle detection and automatic blocking).
- Responsive Kanban board as the main view.
- In-app alerts on login (due/overdue tasks and delayed tasks blocking others).
- Desirable (Phase 3 if time permits): status notes (support requests / deadline changes), critical path highlighting, project goal & closure with group-only contribution summary, and column accumulation alerts.

## Non-goals
- Free-form chat or comment threads.
- File attachments.
- External or scheduled notifications (email, push, cron jobs).
- Video calls or integrations with messaging platforms.
- Native mobile apps or domain-specific features (e.g., grading, legal templates).
