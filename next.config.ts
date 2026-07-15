import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The national campaign landing was renamed /general → this slug.
      // 308 (permanent) preserves the request method; query params (utm_*, gclid…)
      // are carried through automatically.
      {
        source: "/general",
        destination: "/sellos-hidraulicos-y-neumaticos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
