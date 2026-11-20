import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PULSE | Enterprise Agile Workspaces & Sprint Velocity",
    short_name: "PulsePM",
    description: "Next-gen project orchestration SaaS for engineering teams. Real-time Kanban, WebSockets presence sync, and automated burndown telemetry.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
