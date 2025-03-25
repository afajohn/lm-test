import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: process.env.HOSTNAME || '',
			},
			{
				protocol: "https",
				hostname: "lh7-rt.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
			},
			{
				protocol: "https",
				hostname: "loveme.com",
			},
		],

	},
	// Add optimization settings
	swcMinify: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	// Increase build memory limit
	experimental: {
		largePageDataBytes: 128 * 100000, // Increase to 12.8MB
	},
	async rewrites() {
		return [
		  // ✅ Ensure category pages are still available under /blog/:category
		  {
			source: "/blog/:category",
			destination: "/blog/:category", // Leaves category pages unchanged
		  },
		  // ✅ Rewrite blog post URLs
		  {
			source: "/:category/:slug",
			destination: "/blog/:category/:slug", // Maps clean URL to actual structure
		  },
		];
	  },
};

export default nextConfig;
