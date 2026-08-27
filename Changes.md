# FocusForge Component Architecture Refactor

## Summary

`DashboardPage.jsx` originally combined all dashboard state, derived values, event handlers, layout markup, visual styling, and task-row details in a single component. The page worked, but the mixed responsibilities made focused changes risky and prevented the task row and stat card from being reused independently.

The refactor keeps the existing behavior and inline styling intact while making the page a state owner and composer. `DashboardPage.jsx` now contains state declarations, values derived from state, state-updating handlers, and the composition of focused child components.

## Component Responsibilities

| Component | Location | Responsibility | Props |
| --- | --- | --- | --- |
| `DashboardHeader` | `components/dashboard/` | Renders the FocusForge brand, greeting, and user avatar for the dashboard header. | None; the current header is static. |
| `StatsRow` | `components/dashboard/` | Arranges the four dashboard metrics and passes their values to reusable stat cards. | `totalCount`, `completedCount`, `remainingCount`, `progressPercent` |
| `AddTaskInput` | `components/dashboard/` | Renders the add-task form controls and delegates text changes and submission to the page. | `value`, `onChange`, `onAdd` |
| `TaskFilterBar` | `components/dashboard/` | Renders task-status filter buttons and the search input. | `filter`, `onFilterChange`, `searchQuery`, `onSearchChange` |
| `TaskList` | `components/dashboard/` | Renders the filtered collection of tasks or the empty state, and composes each task item. | `tasks`, `onToggle`, `onDelete` |
| `StatCard` | `components/shared/` | Renders a label, value, description, and optional progress indicator without dashboard-specific knowledge. | `label`, `value`, `description`, `valueColor`, `progress` |
| `TaskItem` | `components/shared/` | Renders one task, including completion toggle, priority/tag metadata, and delete action. | `task`, `onToggle`, `onDelete` |

## Why `dashboard/` Versus `shared/`

The components in `components/dashboard/` describe the composition and layout of this particular page. For example, `StatsRow` knows that four metrics belong together on the dashboard, and `TaskFilterBar` knows that the dashboard offers the `all`, `active`, and `completed` filters.

`StatCard` and `TaskItem` were placed in `components/shared/` because they are context-free presentation units. A stat card only needs display values and an optional progress value; it does not know that the values came from FocusForge. A task item receives a task object and callbacks; it does not know how the page filters, stores, or derives the task data. Both can therefore be reused by another page through props.

## State and Data Flow

`DashboardPage` remains the single owner of `taskList`, `newTask`, `filter`, and `searchQuery`. It also owns `addTask`, `toggleTask`, and `deleteTask`. Filtered tasks and statistics are derived in the page and passed down as props. This keeps business behavior in the page while keeping child components focused on rendering and event delegation.

The refactor intentionally introduces no state-management library, context, or external dependency. The existing React and Vite setup is sufficient for this scale of application.

## What I Would Revisit at 10× Scale

At a significantly larger scale, I would separate task-domain operations from page composition with a custom hook or a feature-level service, add typed prop contracts with TypeScript, and introduce component tests for the shared primitives. I would also centralize design tokens rather than repeating inline style values, add responsive layout rules, and consider virtualization if task lists became very large. Those changes were intentionally not included here because the assignment requires a behavior-preserving structural refactor with no visible UI changes.

## Verification

The application was verified with the production build command:

```bash
npm run build
```

Live deployment: **[to be added after deployment]**
