import { use } from 'react';
import { COMMENT_NUM } from './constants';

type Props = {
  params: Promise<{ time: string; cmt: string | number }>;
};

export const generateStaticParams = async () =>
  COMMENT_NUM.map((time, cmt) => ({ time, cmt }));

export default function CmtPage({ params }: Props) {
  const { time, cmt } = use(params);
  console.log(time, cmt);

  return (
    <div>
      Good {time} - {cmt} comments!
    </div>
  );
}
