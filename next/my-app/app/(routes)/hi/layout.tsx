import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export const TIMES = ['morning', 'afternoon', 'evening'];

export default function HiLayout({ children }: PropsWithChildren) {
  return (
    <div className="border-2 border-green-200">
      <div className="flex gap-3">
        {TIMES.map((time) => (
          <Link key={time} href={`/hi/${time}`}>
            {time}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}

//layout page template notfound 등등은 특수파일들.
