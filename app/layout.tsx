import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://project-management-saas-rouge.vercel.app"),
  title: "PULSE | Enterprise Agile Workspaces & Sprint Velocity",
  description:
    "Next-gen project orchestration SaaS for engineering teams. Real-time Kanban, WebSockets presence sync, epics roadmap, and automated burndown telemetry.",
  keywords: ["project management", "linear", "jira", "kanban", "agile", "nextjs", "websockets", "prisma"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "PULSE | Enterprise Agile Workspaces",
    description: "Real-time Kanban, WebSockets presence, and sprint burndown velocity telemetry.",
    type: "website",
    url: "https://project-management-saas-rouge.vercel.app",
    siteName: "PULSE PM",
  },
  twitter: {
    card: "summary_large_image",
    title: "PULSE | Enterprise Agile Workspaces & Sprint Velocity",
    description: "Real-time multi-tenant Kanban boards and automated burndown telemetry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PULSE Project Management SaaS",
    applicationCategory: "ProjectManagementApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "12",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Manthan Ank",
      url: "https://github.com/manthanank",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
