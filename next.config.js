/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	reactStrictMode: true,
	images: {
		domains: ["assets.vercel.com", "https://res.cloudinary.com/"],
	},
	env: {
		BASE_URL: process.env.BASE_URL,
	},
};

module.exports = nextConfig;
