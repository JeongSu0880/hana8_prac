import { NextRequest, NextResponse } from 'next/server';
import { books } from './bookdata';

export async function GET1(req: NextRequest) {
  const { host, hostname, searchParams, pathname, origin, basePath } =
    req.nextUrl;
  return NextResponse.json({
    host,
    hostname,
    pathname,
    origin,
    basePath,
    q: searchParams.get,
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const searchStr = searchParams.get('q') ?? '';
  return NextResponse.json(
    books.filter((book) => book.title.includes(searchStr)),
  );
}

export async function POST(req: NextRequest) {
  const { title, writer } = await req.json();
  const id = Math.max(...books.map((book) => book.id), 0) + 1;
  const newer = { id, title, writer };
  books.push(newer);
  return NextResponse.json(newer);
}

// next의 서버 api 이름은 약속이다 (대문자로 GET, POST,,.,,)
// next는 response를 인자로 받지 않는다. 알아서 리턴해줌.
// NextResonse를 확장할 수는 있다.

// origin -> 해당 api를 불러준 곳
// CORS
// 서로 다른 도메인간에 리소스를 쉐어하기 위한 것. 그래서 다른 도메인에서 api를 사용하려면 허용을 해놓아야 함. (http https 처럼 프로토콜이 달라도 다른 오리진)
