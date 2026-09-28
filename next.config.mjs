/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  experimental: {
    serverComponentsExternalPackages: ["@google/genai"],
  },
  async redirects() {
    return [
      {
        source: "/check",
        destination: "/check/step-1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;