import { useActionState, useEffect, useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useSession, type ItemType } from '../hooks/SessionContext';
import { useInterval } from '../hooks/useTimer';
import LabelInput from './ui/LabelInput';
import Spinner from './ui/Spinner';
import { Button } from './ui/Button';

export default function My() {
  const { session } = useSession();

  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);

  useEffect(() => {
    setInterval(() => setBadSec((p) => p + 1), 1000);
  }, []);

  const ff = () => {
    setGoodSec((p) => p + 1);
  };
  // goodSec + 1 의 값이
  // console.log('🚀 ~ goodSec:', goodSec);
  const { reset, clear } = useInterval(ff, 1000, goodSec + 1);
  // useInterval(setGoodSec, 1000, goodSec + 1);
  // useInterval(() => setGoodSec((p) => p + 1), 1000);
  // useInterval(f, 1000);

  // const [data, setData] = useState<ItemType[]>([]);
  // useLayoutEffect(() => {
  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   fetch('/data/sample.json', { signal })
  //     .then((res) => res.json())
  //     .then(setData);

  //   return () => controller.abort();
  // }, []);
  // const { data } = useFetch<ItemType[]>('/data/sample.json');

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  const [searchStr, setSearchStr] = useState('');
  // const debouncedSearchStr = useDebounce(searchStr, 500);
  const debouncedSearchStr = useThrottle(searchStr, 500);
  // const searchRef = useRef<HTMLInputElement>(null);
  // const [searchStr, setSearchStr] = useState('') //타입 정의 해야돼?
  // const findItemWithName = (name: string) => {
  //   if (session.cart.map((item) => item.name === name))
  //   setSearchStr(session.cart.filter((item) => item.name.startsWith(name)))
  // }
  //useMemo를 써야하는가?
  //str ?? '' 이렇게 쓰면 ''일 때 뭐가 찾아지나?

  const deferredStr = useDeferredValue(searchStr, 'xxx')

  const [isSearching, startSearchTransition] = useTransition();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startSearchTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))// a그냥 일단 뭔가 기다리기 위함 코드 
      setSearchStr(e.target.value)
    })//trasition은 저 promise의 콜백함수가 실행되기 직전에 isSearching을 true 바꿔주고 끝나면 다시 false로
  }

  return (
    <>
      <h1 className='text-xl'>
        bad: {badSec}, good: {goodSec}
      </h1>
      <div className='flex space-x-3'>
        <Button
          variant={'outline'}
          onClick={() => {
            setGoodSec(0);
            reset();
          }}
        >
          reset
        </Button>
        <Button variant={'secondary'} onClick={clear}>
          stop
        </Button>
      </div>
      <hr />

      <h2 className='text-xl'>Tot: {totalPrice.toLocaleString()}원</h2>
      <LabelInput
        label='search'
        onChange={(e) => handleSearch}
      />
      <ul>
        {/* 
        {(session.cart.length ? session.cart : data)
          ?.filter((item) => item.name.includes(debouncedSearchStr)) */}

        {(session.cart)
          ?.filter((item) => item.name.includes(debouncedSearchStr))
          .map((item) => (
            <li key={item.id}>
              <Item item={item} />
            </li>
          ))}
        <li className='text-center'>
          {isAdding ? (
            <Item
              item={{ id: 0, name: 'New Item', price: 3000 }}
              toggleAdding={toggleAdding}
            />
          ) : (
            <Button onClick={toggleAdding} className=''>
              <PlusIcon />
            </Button>
          )}
        </li>
      </ul >
    </>
  );
}

function SearchButton() {
  const { pending, data } = useFormStatus();
  if (data) console.log('ddddddd>>', data, pending);
  return (
    <Button variant={'secondary'} disabled={pending}>
      SearchButton
    </Button>
  );
}
