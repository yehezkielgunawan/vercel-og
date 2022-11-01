/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["assets.vercel.com"],
  },
  swcMinify: true,
  eslint: {
    dirs: ["src"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};
