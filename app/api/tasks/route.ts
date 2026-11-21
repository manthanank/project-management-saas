import { NextResponse } from "next/server";
import { Issue, INITIAL_ISSUES, USERS } from "@/lib/data";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";

let serverIssues: Issue[] = [...INITIAL_ISSUES];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const query = searchParams.get("q")?.toLowerCase();

  let issues = [...serverIssues];

  if (isDatabaseConfigured()) {
    try {
      const dbIssues = await prisma.issue.findMany({
        include: { assignee: true, project: true },
        orderBy: { createdAt: "desc" },
      });
      if (dbIssues && dbIssues.length > 0) {
        issues = dbIssues.map((i) => ({
          id: i.id,
          key: i.identifier,
          title: i.title,
          description: i.description || "",
          status: (i.status as any) || "TODO",
          priority: (i.priority === "URGENT" ? "Urgent" : i.priority === "HIGH" ? "High" : "Medium") as Issue["priority"],
          points: i.points,
          assignee: {
            id: i.assignee ? i.assignee.id : "u-1",
            name: i.assignee ? i.assignee.name : "Alex Rivera",
            email: i.assignee ? i.assignee.email : "alex@acme.corp",
            role: "Admin" as const,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
          },
          labels: ["Engineering", "Sprint"],
          createdAt: i.createdAt.toISOString().split("T")[0],
        }));
      }
    } catch (e) {
      console.warn("[Tasks API] Database query error, using in-memory:", (e as Error).message);
    }
  }

  let filtered = [...issues];

  if (status && status !== "ALL") {
    filtered = filtered.filter((i) => i.status === status);
  }

  if (query) {
    filtered = filtered.filter(
      (i) =>
        i.title.toLowerCase().includes(query) ||
        i.key.toLowerCase().includes(query) ||
        i.description.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    issues: filtered,
    syncedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const nextNum = 100 + serverIssues.length + 1;
    const newIssue: Issue = {
      id: `iss-${Date.now()}`,
      key: `ENG-${nextNum}`,
      title: body.title,
      description: body.description || "",
      status: body.status || "TODO",
      priority: body.priority || "Medium",
      points: Number(body.points) || 3,
      assignee: USERS[0],
      labels: body.labels || ["Full-Stack"],
      createdAt: "Just now",
    };

    serverIssues = [newIssue, ...serverIssues];

    return NextResponse.json({
      success: true,
      message: "Sprint issue created",
      issue: newIssue,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create issue" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    serverIssues = serverIssues.map((i) =>
      i.id === id ? { ...i, status } : i
    );

    return NextResponse.json({
      success: true,
      message: "Issue status updated",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update issue" }, { status: 500 });
  }
}

