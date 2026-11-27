# Roadmap

Each item is a user story: `As a <user>, I want <task>, so that <benefit>.`
When a story gets a spec, append `(spec: specs/YYYY-MM-DD-name)`. Tick it when merged.

## Phase 1: Walking skeleton
- [x] As a group member, I want to sign in with Google and create or join a project via invite link or code, so that my group has a shared workspace. (spec: specs/2026-11-26-google-auth-and-project-join)
- [ ] As a group member, I want to create a task with a title, assignee, and deadline and see it on the project board, so that our work is visible end-to-end.

## Phase 2: Essential MVP
- [ ] As a group member, I want to move tasks across Kanban columns on mobile and desktop, so that the group sees real-time progress.
- [ ] As a group member, I want to edit a task's assignee and deadline, so that the group can adapt when plans change.
- [ ] As a group member, I want to link predecessor tasks without creating cycles and have dependent tasks automatically blocked until predecessors finish, so that nobody starts out of order.
- [ ] As a group member, I want to see in-app alerts on login for due/overdue tasks and delayed tasks blocking other work, so that I can act before delays cascade.

## Phase 3: Desirable
- [ ] As a group member, I want to add a short status note when requesting support or changing a deadline, so that teammates know why without needing separate chat.
- [ ] As a group member, I want to see which tasks are on the critical path, so that the group prioritizes work that affects the final deadline.
- [ ] As a group member, I want to set a project goal and close the project to view a group-only contribution summary, so that we can wrap up fairly.
- [ ] As a group member, I want to see an alert when too many tasks accumulate in one column, so that we notice bottlenecks early.

## Later
- [ ] As a group member, I want to see an alert when workload is unbalanced across members, so that we can redistribute tasks.
- [ ] As a group member, I want to view a read-only mini Gantt chart for tasks with dependencies, so that we can see the schedule at a glance.
- [ ] As a group member, I want an optional 15-activity guided checklist when starting a project, so that new groups know how to organize step by step.
