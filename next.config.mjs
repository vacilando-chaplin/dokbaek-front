/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['filogram.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
