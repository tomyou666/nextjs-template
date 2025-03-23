import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	serverExternalPackages: ['pino'],
}

export default nextConfig
