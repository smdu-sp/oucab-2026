/** @format */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	basePath: '/oucab',
	env: {
		NEXT_PUBLIC_BASE_PATH: '/oucab',
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
		optimizePackageImports: ['lucide-react', 'date-fns'],
	},
	allowedDevOrigins: [
		'10.20.4.6',
		'127.0.0.1',
		'192.168.1.10'
	],
};

export default nextConfig;
