import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

// type Photo = {
//   id:
// }

// const getPhotos = async (n: number = 10): Promise<Photo[]> =>
//   fetch(`https://picsum.photos/v2/list?limit=${n}`).then((res) => res.json());

// export const generateStaticParams = async () => {
//   // const photos: Awaited<Photo> = await fetch(//이게 정석임.
//   const photos = await fetch(`https://picsum.photos/v2/list?limit=10`).then(
//     (res) => res.json(),
//   ); // as Photo -> 이런식으로 타입을 잡는건 async에서는 좋지 않다.
//   //이런식으로 인터셉트 라우트도 SSG로 만들 수 잇따.
// };

// export default function Page() {
//   const data = fetch('https://picsum.photos/v2/list?limit=10').then(
//     (res) => res.json(), // 이런시긍로 fetch로 데이터를 가져오는 경우에 정적 페이지는 옳지 않다. (요청의 결과가 어떨지 모르니까)
//   ); // 이거 그냥 함수로 빼고 n 받기
//   const photos = use(data);
//   //   console.log(photos);

export type Photo = {
  id: string;
  author: string;
  download_url: string;
  width: number;
  height: number;
};

// export const revalidate = 86400; //cache 옵션 켠 후로 못 써
//

const getPhotos = async (n: number = 20): Promise<Photo[]> =>
  fetch(`https://picsum.photos/v2/list?limit=${n}`, {
    cache: 'force-cache',
  }).then((res) => res.json());

export default async function Photos() {
  cacheLife('minutes');
  const photos = use(getPhotos());
  return (
    // <div className="grid grid-cols-4 gap-3">
    <div className="flex flex-wrap justify-center gap-3">
      {photos.map((photo: { id: string; download_url: string }) => {
        return (
          <div key={photo.id}>
            <Link
              className="hover:opacity-70"
              key={photo.id}
              href={`/photos/${photo.id}`}
            >
              <Image
                src={photo.download_url}
                alt="xxx"
                width={200}
                height={200}
                quality={70}
              />
              photo{photo.id}
            </Link>
          </div>
        );
      })}
    </div>
    // <Image
    //   src="https://picsum.photos/v2/list?limit=10"
    //   alt="xxx"
    //   width={200}
    //   height={200}
    // />
  );
}
// layout에 list 뿌리면 안되는 이유 -> 왜냐면 그 위에 모달이 띄워져야하는데 layout이면 항상 모든 페이지에서 보여야하는 부분이니까
// 모달이랑 겹쳐서 나올 수 없다.
