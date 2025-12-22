import Link from 'next/link';
import { type PropsWithChildren, Suspense } from 'react';

export default function HelloLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex justify-between p-3">
        <Link href={'/'}>Home</Link>
        <Link href={'/hello'}>Hello</Link>
        <Link href="/hello/morning">Morning</Link>
        <Link href="/hello/afternoon">Afternoon</Link>
        <Link href="/hello/evening">Evening</Link>
      </div>
      <Suspense>
        <div className="border p-5 text-center">{children}</div>
      </Suspense>
    </>
  );
}

//page.tsx
