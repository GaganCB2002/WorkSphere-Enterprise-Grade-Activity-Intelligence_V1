import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@new_project"],
  outputFileTracingRoot: path.join(__dirname, "../../../"),
  experimental: {
    externalDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      { source: "/login", destination: "/" },
      { source: "/super-admin", destination: "/" },
      { source: "/admin", destination: "/" },
      { source: "/ceo", destination: "/" },
      { source: "/cto", destination: "/" },
      { source: "/hr-manager", destination: "/" },
      { source: "/hr", destination: "/" },
      { source: "/finance", destination: "/" },
      { source: "/marketing", destination: "/" },
      { source: "/sales", destination: "/" },
      { source: "/project-manager", destination: "/" },
      { source: "/tech-lead", destination: "/" },
      { source: "/devops", destination: "/" },
      { source: "/qa", destination: "/" },
      { source: "/developer", destination: "/" },
      { source: "/security", destination: "/" },
      { source: "/support", destination: "/" },
      { source: "/employee", destination: "/" },
      { source: "/intern", destination: "/" },
    ];
  },
};

export default nextConfig;
