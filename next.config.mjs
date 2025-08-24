/** @type {import('next').NextConfig} */
const nextConfig = {
	typedRoutes: true,
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '**' },
			{ protocol: 'http', hostname: '**' },
		],
	},
};

export default nextConfig;