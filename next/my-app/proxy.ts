import { type NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const didLogin = req.cookies.has('nextjs');
  // if (!didLogin) redirect('/');
  if (!didLogin) return NextResponse.json({ msg: 'Need Login!' });

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|regist|_next/static|_next/image|auth|favicon.ico|robots.txt|images|api/books|$).*)',
    // '/api/:path*',
    //이게 무슨 뜻이냐면,첫번째는 로그인안해도 되는 것들(마지막 books는 그냥 추가) 두번째는 api로 들어오는 모든 요청
    //공식사이트 내용
  ],

  //   matcher: ['/photos', '/api/books/:path*'],
};
// authorization : 권한에 대란 처리
// authentication:
