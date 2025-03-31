/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["assets.vercel.com", "https://res.cloudinary.com/"],
	},
	env: {
		BASE_URL: process.env.BASE_URL,
	},
};
