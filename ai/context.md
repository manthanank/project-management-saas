# AI Context & System Architecture: Project Management SaaS

## Overview
A Linear/Jira-inspired enterprise agile workflow and project orchestration SaaS built with Next.js 15, PostgreSQL (via Prisma ORM), simulated WebSockets real-time multi-cursor sync, and sprint velocity analytics.

## Key Routes & Architecture
- `/`: Enterprise marketing landing page with live interactive sprint velocity simulator, pricing tiers, customer ROI testimonials, and FAQ.
- `/workspace`: Multi-tenant project workspace featuring a 5-column Kanban board (Backlog, Todo, In Progress, Review, Done) with priority tags, estimate points, and new issue creation modal.
- `/roadmap`: Interactive quarterly Gantt timeline with multi-stage epics, milestone completion progress bars, and risk status indicators.
- `/analytics`: Deep agile telemetry powered by Recharts (Sprint Burndown curve comparing ideal vs actual velocity, cycle time histograms, and team throughput).
- `/settings`: Organization directory, team RBAC roles (Owner, Admin, Member, Guest), simulated WebSockets presence monitor, and Prisma relational schema explorer.
- `/api/events`: Simulated WebSockets / SSE real-time issue mutation event pipeline.

## Relational Data Model (Prisma)
- Workspace: id, name, slug, plan, users, projects, createdAt.
- Project: id, name, key, workspaceId, sprints, issues, createdAt.
- Sprint: id, name, goal, startDate, endDate, status, projectId, issues.
- Issue: id, identifier (e.g. ENG-142), title, description, status, priority, points, assigneeId, projectId, sprintId.
- User: id, name, email, avatar, role, workspaceId.
