const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding project-management-saas PostgreSQL database...');

  const workspace = await prisma.workspace.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Enterprise Engineering',
      slug: 'acme-corp',
      plan: 'ENTERPRISE',
    }
  });

  const user = await prisma.user.upsert({
    where: { email: 'alex@acme.corp' },
    update: {},
    create: {
      name: 'Alex Rivera',
      email: 'alex@acme.corp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      role: 'ADMIN',
      workspaceId: workspace.id,
    }
  });

  const project = await prisma.project.create({
    data: {
      name: 'Distributed Cloud Mesh Platform',
      key: 'ENG',
      description: 'High-availability cross-region routing and zero-trust service mesh.',
      workspaceId: workspace.id,
    }
  });

  const sprint = await prisma.sprint.create({
    data: {
      name: 'Sprint 42 - Q4 Milestone',
      goal: 'Finalize zero-copy IPC streaming and edge proxy routes',
      status: 'ACTIVE',
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      projectId: project.id,
    }
  });

  const sampleIssues = [
    {
      identifier: 'ENG-101',
      title: 'Architect distributed circuit breaker pattern for egress proxies',
      description: 'Implement adaptive concurrency limits and backoff jitter on upstream timeouts.',
      status: 'IN_PROGRESS',
      priority: 'URGENT',
      points: 5,
      projectId: project.id,
      sprintId: sprint.id,
      assigneeId: user.id,
    },
    {
      identifier: 'ENG-102',
      title: 'Benchmark low-latency connection pooling under 100k req/sec',
      description: 'Execute wrk2 load tests across edge nodes and capture p99 latency heatmaps.',
      status: 'TODO',
      priority: 'HIGH',
      points: 3,
      projectId: project.id,
      sprintId: sprint.id,
      assigneeId: user.id,
    },
    {
      identifier: 'ENG-103',
      title: 'Automate zero-downtime database schema migration pipelines',
      description: 'Integrate shadow branch previews and automatic rollback safety guards.',
      status: 'DONE',
      priority: 'MEDIUM',
      points: 2,
      projectId: project.id,
      sprintId: sprint.id,
      assigneeId: user.id,
    }
  ];

  for (const issue of sampleIssues) {
    await prisma.issue.upsert({
      where: { identifier: issue.identifier },
      update: issue,
      create: issue
    });
  }

  const count = await prisma.issue.count();
  console.log(`Successfully seeded project-management-saas! Total issues in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
