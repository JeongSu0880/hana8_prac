import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    typedEnv: true,
  },
  typedRoutes: true, //이설정 중요함. 없는 주소를 접근하지 못하게
  images: {
    remotePatterns: [{ hostname: 'picsum.photos' }],
  },
};

export default nextConfig;
