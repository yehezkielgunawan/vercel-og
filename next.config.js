/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	experimental: {
		esmExternals: "loose",
	},
	reactStrictMode: true,
	images: {
		domains: ["assets.vercel.com", "https://res.cloudinary.com/"],
	},
	env: {
		BASE_URL: process.env.BASE_URL,
	},
};

module.exports = nextConfig;
