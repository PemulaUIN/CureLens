/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Pindahkan ke dalam objek experimental
  experimental: {
    serverComponentsExternalPackages: ["@google/genai"],
  },
};

export default nextConfig;