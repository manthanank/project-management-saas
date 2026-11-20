# Pulse.pm — Agile Workspace & Sprint Kanban SaaS

Pulse.pm is a high-velocity project management platform built with Next.js 15, TypeScript, and Tailwind CSS. It supports sprint planning, drag-and-drop Kanban workflow boards, quarterly epic roadmaps, and real-time team collaboration.

## Key Features

- **Interactive Sprint Kanban (`/workspace`)**: Drag-and-drop state transitions across Backlog, Todo, In Progress, In Review, and Done columns.
- **Dynamic Tasks REST API (`/api/tasks`)**: Server-backed issue creation, status mutation, priority assignment, and estimation points.
- **Quarterly Roadmap View (`/roadmap`)**: Strategic Gantt-style planning timeline with epic progress tracking, risk factors, and point burndown.
- **Velocity & Burnup Analytics (`/analytics`)**: Interactive burndown charts, lead-time distribution, and sprint velocity measurements.
- **Multi-Tenant Team Settings (`/settings`)**: Member role-based access control (RBAC), API key management, and webhook subscriptions.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Lucide Icons, Framer Motion
- **State & Data**: Server REST API with Local Storage fallback
- **Deployment**: Vercel

## API Endpoints

- `GET /api/tasks`: Fetch sprint issues with status and keyword filtering.
- `POST /api/tasks`: Add a new engineering issue to the current sprint.
- `PUT /api/tasks`: Update issue status or priority.
- `GET /api/events`: Event stream for real-time collaboration.

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd c:\Users\manth\projects\project-management-saas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).
