import { type NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const didLogin = req.cookies.has('nextjs');
  // if (!didLogin) redirect('/');
  if (!didLogin) return NextResponse.json({ msg: 'Need Login!' });
  //여기에 뭐 추가
  return NextResponse.next();
}

export const config = {
  // matcher: ['/admin', '/api/books/:path*'],
  matcher: [
    // '/((?!login|regist|_next/static|_next/image|auth|api/auth|favicon.ico|robots.txt|images|api/books|$).*)',
    '/admin',
    '/caches',
    // '/api/:path*',
    // 'posts/:postId*/edit',
  ],
};
