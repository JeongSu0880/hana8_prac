// 'use client'
// import { useParams } from 'next/navigation';

import { use } from 'react';

// export default function HelloId() {
//   const { id } = useParams<{ id: string }>();
//   return `Hello id is ${id}`;
// }
//위는 클라이언트 버전

type Props = {
  params: Promise<{ id: number }>;
};

// export default async function HelloId({ params }: Props) {
export default function HelloId({ params }: Props) {
  //   const { id } = await params;
  const { id } = use(params);
  return `Hello id is ${id}`;
}

// params는 request 객체에 담겨서 온다.
// 비동기이니까 Promise로 오는 거임.
// 반면에 위의 클라이언트 컴
