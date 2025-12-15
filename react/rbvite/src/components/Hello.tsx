//여기서 ㅜname은 무조건 객체로.. 왜 무조건 객체로??

import type { PropsWithChildren } from 'react';
import Button from './ui/Button';
import { useCounter } from '../hooks/CounterContext';
import { useSession } from '../hooks/SessionContext';

// type Prop = {
//     name: string;
//     children: ReactNode
// };
//ReactNode 타입 아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ

// T & {childrean : ReactNode;}
// type Prop = PropsWithChildren<{
//   name?: string;
//   age?: number;
//   // setCount: (cb: (c: number) => number) => void;
//   // plusCount: () => void;
// }>;

export default function Hello({ children }: PropsWithChildren) {
  const { count, plusCount } = useCounter();
  const { session: { loginUser } } = useSession();

  const { name, age } = loginUser;

  return (
    <div className='border p-3 border-red-200 text-center'>
      <h2>
        Hello, {name || 'guest'}
        {age && <small className='test-sm'>({age})</small>}
      </h2>
      <div>{children}</div>
      <Button className='font-bold' onClick={() => plusCount(1)}>
        count is {count}
      </Button>
    </div>
  );
}
// 함수 컴포넌트는 꼭 JSX를 리턴해야함.

// 컴포넌트는 화살표 함수 ㅆ는버 별로 안좋다.
