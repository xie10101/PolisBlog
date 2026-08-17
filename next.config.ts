import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      // 你可以添加其他域名
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;

// 出于安全考虑，Next.js 要求你必须显式列出允许通过 <Image /> 组件加载的外部图片域名。出于安全考虑，Next.js 要求你必须显式列出允许通过 <Image /> 组件加载的外部图片域名。