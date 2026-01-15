import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/react-native-animated-toast-alerts',
  assetPrefix: '/react-native-animated-toast-alerts',
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
