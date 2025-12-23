import Image from 'next/image';
import { use } from 'react';
import Modal from '@/components/modal';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

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
      <Image src={photo.download_url} alt="xxx" width={200} height={200} />
    </Modal>
  );
}
