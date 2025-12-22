import type { PropsWithChildren } from 'react';

export default function HelloTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <h1>Hello Layout</h1>
      {/* <Link href={'/'}>HOME</Link> */}
      <div className="border p-5 text-center">{children}</div>
    </>
  );
}

//page.tsx
