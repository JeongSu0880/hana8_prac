import { use } from 'react';
import { TIMES } from '../../../layout';

type Props = {
  params: Promise<{ time: string; cmt: string | number }>;
};

export const generateStaticParams = async () =>
  TIMES.flatMap((time, i) =>
    [1, 2, 3].map((cmt) => ({ time, cmt: String(cmt * 3 + i) })),
  );
// COMMENT_NUM.map((time, cmt) => ({ time, cmt }));
//빌드할 때 비동기로 동작해서 async 써야함

export default function CmtPage({ params }: Props) {
  const { time, cmt } = use(params);
  // console.log(time, cmt);

  return (
    <div>
      Good {time} - {cmt} comments!
    </div>
  );
}
