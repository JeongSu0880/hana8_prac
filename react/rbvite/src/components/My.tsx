import {
  useActionState,
  useDeferredValue,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition,
  type ChangeEvent
} from 'react';
import { useFormStatus } from 'react-dom';
import { useSession, type ItemType } from '../hooks/SessionContext';
import { useInterval, useThrottle } from '../hooks/useTimer';
import { type ProfileHandler } from './Profile';
import { Button } from './ui/button';
import LabelInput from './ui/LabelInput';

export default function My() {
  const [isAdding, toggleAdding] = useReducer((pre) => !pre, false);

  const profileHandlerRef = useRef<ProfileHandler>(null);

  // const item101 = session.cart.find((item) => item.id === 101);


  const [searchStr, setSearchStr] = useState('');
  const debouncedSearchStr = useThrottle(searchStr, 500);

  const deferredStr = useDeferredValue(searchStr, 'xxx');

  const [searchResult, setSearchResult] = useState<ItemType[]>([]);
  const [isSearching, startSearchTransition] = useTransition();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startSearchTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const str = e.target.value;
      setSearchStr(str);
      setSearchResult(session.cart.filter((item) => item.name.includes(str)));
    });
  };

  const [results, search, isPending] = useActionState(
    async (preResults: ItemType[], formData: FormData) => {
      const str = formData.get('ActionState') as string;
      console.log('******', preResults, str);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return session.cart.filter((item) => item.name.includes(str));
    },
    []
  );

  /*------------------------------------------------*/
  const { session } = useSession();
  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);

  useEffect(() => {
    setInterval(() => setBadSec((p) => p + 1), 1000);
  }, []);

  const ff = () => {
    setGoodSec((p) => p + 1);
  };
  const { reset, clear } = useInterval(ff, 1000);

  /*useMemo
  성능 향상을 위해 결과 값을 메모이제이션 해놓는 훅 (불필요한 리렌더링 줄임)
  렌더링 사이에 계산 결과를 캐싱할 수 있게 해주는 훅
  주의사항: 리액트 공식 문서에 따르면 해당 훅은 오로지 성능 향상을 위해 사용이 되어야 한다고 함.
  그런데 React 19 버전부터 react compiler가 이 메모이제이션을 어느정도 지원해서 알아서 최적화해주기 때문에
  useMemo를 사용하는 일이 훨씬 적어졌다.
  */
  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  return (
    <>
      <h1 className='text-xl'>
        bad: {badSec}, good: {goodSec}
      </h1>
      <div className='flex'>
        <button onClick={reset}>reset</button>
        <button onClick={clear}>stop</button>
      </div>



      {/* {session?.loginUser ? <Profile ref={profileHandlerRef} /> : <Login />} */}
      {/* <hr />
      <a
        href='#!'
        onClick={(e) => {
          e.preventDefault();
          profileHandlerRef.current?.showLoginUser();
          console.log('xxx>>', profileHandlerRef.current?.xxx);
        }}
      >
        {item101?.name}
      </a> */}
      <h2 className='text-xl'>Tot: {totalPrice.toLocaleString()}원</h2>
      {/* <Posts />
      {isPending ? (
        <Spinner />
      ) : (
        <div>SR_ActionState :{results.map((item) => item.name).join()}</div>
      )} */}

      {/* <div>SR_Transition: {searchResult.map((item) => item.name).join()}</div>
      {isSearching ? (
        <Spinner />
      ) : (
        <h2 className='text-xl text-red-500'>
          {searchStr} : {deferredStr} : {debouncedSearchStr}
        </h2>
      )} */}

      <form className='flex gap-2'>
        <LabelInput label='ActionState' autoComplete='off' />
        <button formAction={search}>Action</button>
        <SearchButton />
      </form>

      {/* <LabelInput
        label='Transition'
        onChange={handleSearch}
        autoComplete='off'
      /> */}
      {/* <ul>
        {session.cart
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
            <Btn onClick={toggleAdding} className=''>
              <PlusIcon />
            </Btn>
          )}
        </li>
      </ul> */}
    </>
  );
}

function SearchButton() {
  const { pending, data } = useFormStatus();
  if (data) console.log('ddddddd>>', data, pending);
  return <Button disabled={pending}>SearchButton</Button>;
}
