'use cache';
import { use } from 'react';
import { TIMES } from '../layout';

type Props = {
  params: Promise<{ time: 'morning' | 'afternoon' | 'evening' }>;
};

// export async function generateStaticParams() {
//   return [{ time: 'morning' }, { time: 'afternoon' }, { time: 'evening' }];
// }
export const generateStaticParams = async () => TIMES.map((time) => ({ time }));

export default async function Hi({ params }: Props) {
  const { time } = use(params);
  return <h1>Good {time}!</h1>;
}
