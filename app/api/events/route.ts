import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "CONNECTED",
    transport: "WebSockets / SSE Fallback",
    latency: "14ms",
    activePeers: 4,
    workspace: "Acme Engineering Core",
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    return NextResponse.json({
      success: true,
      broadcastedAt: new Date().toISOString(),
      event: payload.event || "ISSUE_MUTATED",
      payload,
    });
  } catch {
    return NextResponse.json({ error: "Failed to dispatch event" }, { status: 500 });
  }
}

