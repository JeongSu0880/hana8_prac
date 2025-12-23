import { use } from 'react';
import { TIMES } from '@/app/(routes)/hi/layout';

type Props = {
  params: Promise<{ time: string }>;
};

export const generateStaticParams = async () => TIMES.map((time) => ({ time }));

export default function Page({ params }: Props) {
  const { time } = use(params);
  return `Hello/(..)hi/${time}`;
}
