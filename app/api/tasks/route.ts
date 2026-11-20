import { NextResponse } from "next/server";
import { Issue, INITIAL_ISSUES, USERS } from "@/lib/data";

let serverIssues: Issue[] = [...INITIAL_ISSUES];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const query = searchParams.get("q")?.toLowerCase();

  let filtered = [...serverIssues];

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
