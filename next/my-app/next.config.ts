import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    typedEnv: true,
  },
  cacheComponents: true,
  typedRoutes: true, //이설정 중요함. 없는 주소를 접근하지 못하게
  images: {
    remotePatterns: [{ hostname: 'picsum.photos' }],
  },
};

export default nextConfig;

//바바 여기서 cacheComponent를 쓰는 것과 안쓰는 것은 매우 달라.
// 이걸 활성화 시키면 전체 프로젝트 구조가 싹 바뀜.
//
