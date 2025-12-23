import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  modal: ReactNode;
}; // 영역마다 나눠서 잡은건가?

export default function ParallelLayout({ children, modal }: Props) {
  return (
    <div>
      <div>{children}</div>
      <div className="border border-red-900">{modal}</div>
    </div>
  );
}
