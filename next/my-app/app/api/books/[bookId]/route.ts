import { errorResponse, HttpError } from '@/lib/error';
import { NextRequest, NextResponse } from 'next/server';
import { type Book, books } from '../bookdata';

type Params = {
  params: Promise<{ bookId: string }>;
};

const getBook = async ({ params }: Params, isIndex: boolean) => {
  const { bookId } = await params;
  const fn = isIndex ? books.findIndex : books.find;
  const book = fn.bind(books)((book) => book.id === +bookId);

  if (!book) throw new HttpError(`Notfound ${bookId}`, 404);
  return book;
};
//여기서 PATCH 요청에 에러가 났던 이유
// books.__proto__ == Array.prototype
// fn 를 가져올 때 가져와지는 것 -> function Object의 주소. (this바인딩이 되지 않음.)
// 그래서 바인딩을 해줘야함!

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    // console.log(await req.json());
    const book = (await getBook({ params }, false)) as Book;
    const { title, writer } = await req.json();

    book.title = title;
    book.writer = writer;
    return NextResponse.json(book);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const book = getBook({ params }, false);

    return NextResponse.json(book);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const book = (await getBook({ params }, true)) as number;
    books.splice(book, 1);
    return NextResponse.json(books);
  } catch (err) {
    return errorResponse(err);
  }
}
