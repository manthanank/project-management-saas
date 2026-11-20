import { describe, it, expect } from "vitest";
import { GET as getTasks } from "../app/api/tasks/route";

describe("Project Management SaaS API Routes", () => {
  it("GET /api/tasks returns task board items", async () => {
    const req = new Request("http://localhost:3000/api/tasks");
    const res = await getTasks(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.issues)).toBe(true);
    expect(data.issues.length).toBeGreaterThan(0);
  });
});
