/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bayut-production.s3.eu-central-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
