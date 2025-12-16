import { PlusIcon } from 'lucide-react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useSession, type ItemType } from '../hooks/SessionContext';
import Item from './Item';
import Login from './Login';
import Profile, { type ProfileHandler } from './Profile';
import Button from './ui/Button';
import { useInterval, useTimeout } from '../hooks/Interval';
import { useFetch } from '../hooks/fetch';

export default function My() {
  const { session } = useSession();
  // const [isAdding, setAdding] = useState(false);
  // const toggleAdding = () => setAdding((prev) => !prev)
  //이거 두개나 사용하는 것은 비효율적
  const [isAdding, toggleAdding] = useReducer(pre => !pre, false)
  //Reducer -> useState 하나와 함수 하나를 합칠 수 있어요.
  const [totalPrice, addPrice] = useReducer((pre, action) => pre + action, 0)


  const profileHandlerRef = useRef<ProfileHandler>(null);

  const item101 = session.cart.find((item) => item.id === 101);
  // useEffect(() => {
  //   console.log('🚀 ~ item101:', item101);
  // }, [item101]);

  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);
  // useEffect(() => {
  //   setInterval(() => { setBadSec(s => s + 1) }, 1000)
  // })

  // useEffect(() => {
  //   const id = setInterval(() => { setGoodSec(s => s + 1) }, 1000)
  //   return () => clearInterval(id);
  // }) //cleanup function
  //언제 써야됨?
  // timer, eventListner

  //위의 useEffect는 strict 모드 때문에 2번 실행될 때 clear를 안해줘서 두개씩 증가
  //아래는 1개씩 증가

  //그럼 strict 모드를 끄면 안되나?
  //절대 안된다. (왜?)

  // 후자 useEffect 같은 경우에 매번 clean 함수를 하면 귀찮으니까 이럴때 커스텀 훅을 주로 사용

  // useInterval(() => setGoodSec(s => s + 1), 1000)
  // useInterval(setGoodSec, 1000, goodSec + 1)

  // useTimeout(() => {
  //   console.log("1초 뒤 실행");
  // }, 1000);

  // const [data, setData] = useState<ItemType[]>([]); //초깃값 빈 배열 주면 된다 (undefined 말고)
  // useEffect(() => {
  //   const controller = new AbortController();

  //   const { signal } = controller;
  //   fetch('/data/sample.json', { signal }).then(res => res.json()).then(setData)
  //   return () => controller.abort();
  // }, []);

  const { data } = useFetch('/data/sample.json');


  return (
    <>
      <h1 className='text-2xl'>bad : {badSec}, good : {goodSec}</h1>
      {session?.loginUser ? <Profile ref={profileHandlerRef} /> : <Login />}
      <hr />
      <a
        href='#!'
        onClick={(e) => {
          e.preventDefault();
          profileHandlerRef.current?.showLoginUser();
          console.log('xxx>>', profileHandlerRef.current?.xxx);
        }}
      >
        {item101?.name}
      </a>
      <ul>
        {session.cart.map((item) => (
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


/* Reducer 함수의 내부 구조

  function useReducer(reducer, initValueOrFuntion) {
    const [state, setState] = useState(initValueOrFuntion);
    -> dispath함수는 toggleAdding이고, reducer함수는 pre => !pre라고 할 수 잇다.
    const dispatch = (action) => {
      setState(reducer(preState, action))
    }

    return [state, dispatch];
  }

  몇년 전 카카오 코테에서 useState를 useReducer로 , useReducer를 useState로 구현해보시라고 나왔다고 하네요.
*/