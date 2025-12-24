import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function PhotoPage({ params }: Props) {
  const { id } = use(params);
  const photoData = fetch(`https://picsum.photos/id/${id}/info`).then((data) =>
    data.json(),
  );
  const photo: {
    id: string;
    download_url: string;
    author: string;
  } = use(photoData);
  // fetch 결과에 as로 타입 잡고 디스트럭처링하기
  return (
    <div>
      <h1>{photo.author}</h1>
      <Image
        src={photo.download_url}
        alt="xxx"
        width={200}
        height={200}
        quality={70}
        loading="lazy"
      />
      <Link href="/photos"></Link>
      {photo.download_url}
    </div>
  );
}
