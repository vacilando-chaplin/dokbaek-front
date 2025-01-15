/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "filogram.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**"
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb"
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
};

export default nextConfig;
