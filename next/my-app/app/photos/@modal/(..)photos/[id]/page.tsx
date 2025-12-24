import Image from 'next/image';
import { use } from 'react';
import Modal from '@/components/modal';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = false;
//intercept 라우터에서 에러가 나면 그냥 인터셒ㅂ트 무시됨.

export default function PhotoModal({ params }: Props) {
  const { id } = use(params);
  const photoData = fetch(`https://picsum.photos/id/${id}/info`).then((data) =>
    data.json(),
  );
  const photo: {
    id: string;
    download_url: string;
    author: string;
  } = use(photoData);

  return (
    <Modal>
      <h1>{photo.author}</h1>
      <Image
        src={photo.download_url}
        alt="xxx"
        width={200}
        height={200}
        placeholder="blur"
        blurDataURL="/public/file.svg" //이거 svg이면 dev 환경에서만 적용이 됨. base64만 가능
      />
    </Modal>
  );
}
