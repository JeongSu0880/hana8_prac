import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
export default function Page() {
  const data = fetch('https://picsum.photos/v2/list?limit=10').then((res) =>
    res.json(),
  );
  const photos = use(data);
  //   console.log(photos);
  return (
    <div className="grid grid-cols-4 gap-3">
      {photos.map((photo: { id: string; download_url: string }) => {
        return (
          <div key={photo.id}>
            <Link key={photo.id} href={`/photos/${photo.id}`}>
              <Image
                src={photo.download_url}
                alt="xxx"
                width={200}
                height={200}
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
