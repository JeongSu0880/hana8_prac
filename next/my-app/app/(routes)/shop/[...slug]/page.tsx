import { use } from 'react';

type Props = {
  params: Promise<{ slug: number[] | string[] }>;
};

// shop/
export const generateStaticParams = async () => [{ slug: ['X'] }]; // slug에 대해서 뭐라도 하나 써아!

export default function Shop({ params }: Props) {
  const { slug } = use(params);
  return <>Slugs: {slug}</>;
}
