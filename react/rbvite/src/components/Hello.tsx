import { useEffect, useReducer, type PropsWithChildren } from 'react';
import { useCounter } from '../hooks/CounterContext';
import { useSession } from '../hooks/SessionContext';
import Button from './ui/Button';
import { useToggle } from '../hooks/toggle';

export default function Hello({ children }: PropsWithChildren) {
  const { plusCount, minusCount } = useCounter();
  //context안의 문가가 바뀌어도 리렌더링
  const [toggler, toggle] = useToggle(); //커스텀 훅
  const {
    session: { loginUser },
  } = useSession();
  const { name = 'Guest', age } = loginUser || {};

  useEffect(() => {
    plusCount();
    console.log(toggler);
    return () => minusCount();
  }, [plusCount, minusCount])
  //[]안의 변수가 바뀌면 계속 실행되도록 (옵저버)
  // [](dependency array)안에는 primitive 타입은 값으로, 그렇지 않으면 주소고 변화를 감지
  // 어떤 타입이 어떤 것을 대상으로 비교하는지 중요

  //[]안에 plusCounter를 넣었을 때 왜 무한 루프?
  //count가 계속해서 바뀌니까 계속 다시 마운트 외는 것임.
  //그래서 방지하기 위해 plusCount와 minuCount에 useCallback를 씌어주면 됨.
  //useCallback은 함수를 메모이제이션 하는 느낌

  // 리렌더링 -> 상태가 바뀌면 일어나는 것. (컴포넌트 안에 어떤 상태던 )

  //왜 무거운 연산을 useEffect에 많이 넣는거야?????

  //eslint가 []에 사용되는 모든 변수를 걸어주는 것을 권장함.

  return (
    <div className='border border-red-300 p-3 text-center'>
      <h2 className='text-2xl'>
        Hello, {name}
        {age && <small className='text-sm'>({age})</small>}
      </h2>
      <div>{children}</div>
      <Button className='font-bold' onClick={plusCount}>
        count + 1
      </Button>
    </div>
  );
}
