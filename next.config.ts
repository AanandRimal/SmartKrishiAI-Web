import type { NextConfig } from 'next'

// Static export: the site is plain files on Cloudflare Pages, no server.
const config: NextConfig = { output: 'export', images: { unoptimized: true } }
export default config
