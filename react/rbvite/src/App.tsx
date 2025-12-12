import { useState } from 'react';
import Hello from './components/Hello';
import My from './components/My';

type Item = {
  id: number;
  name: string;
  price: number;
  isSoldOut?: boolean;
}
export type LoginUser = { id: number, name: string, age: number }

export type Session = {
  loginUser: LoginUser | null;
  cart: Item[];
};

const DefaultSession: Session = {
  loginUser: null,
  // loginUser: { id: 1, name: "Hong", age: 22 },
  cart: [{ id: 100, name: '라면', price: 3000 }, { id: 101, name: '컵라면', price: 2000 }, { id: 200, name: '파', price: 5000 }]
}

// export const Hello = (prop: { name: string; }) => <h2>Hello, {prop.name}</h2>;
//여기서 prop은 상태이지만 아래의 useState와 다르게 변경할 숭 ㅣㅅ는 방법이 없어. 그래서 readonly인 것.

export type LoginFunction = (name: string, age: number) => void;


function App() {
  const [count, setCount] = useState(0);
  //setCount 안에서 render를 불러서 coount를 바꿈?????????
  const x = count;
  console.log('🚀 ~ App ~ x:', x);
  const [session, setSession] = useState<Session>(DefaultSession);
  const logout = () => {
    setSession({ ...session, loginUser: null })
  } // 이 함수는 어쩔 수 없이 안에 있는 것. 왜냐 session이 안에 있으니까


  // const plusCount = () => setCount(count + 1)
  //여기서 문제가 있는게 fiber가 배치로 렌더링을 처리하는데, 만약 최소 시간 단위가 17ms라고 하면, 그 안에 
  // 몇번을 불러도 count + 1 이니까 그냥 1만 증가 되는 것. 
  // 그런데 만약 아래와 같이 함수로 전달하면 이전값을 항상 다음 호출에 전달하니까
  const plusCount = () => setCount((prevCount) => prevCount + 1);// stateAction 함수는 항상 이전값을 전달하니까
  // 호출 횟수 만큼 증가가 되는 것임.

  const login: LoginFunction = (name, age) => {
    if (!name || !age) return alert('Input Name and Age, plz!');

    setSession({ ...session, loginUser: { id: 1, name, age } })
  }
  //위 처럼 타입을 명시할 수도 있지만 추론이 가능한 건 생략하는게 좋다.
  // x = 0; // useState에 들어있는 이 값은 싱글톤이야. if (x === undefined)일 때만 초기화 한다. 그러니까 매번 호출될때도 생성되는게 아니고 유지되는 것임. 그래서 빠르다 .
  // function setAction(y) {this.x = typeof y === 'func' ? y(x): y; render();} // 여기서 이전 x값을 매개변수로 주는 것은 약속임니다. 또, render()
  // return [x, setAction];
  //이 함수는 계속 호출이 되는 거임. 상태가 변할 때마다.
  //누가 호출.?

  // 딱 이부분에 오래 걸리는 연산이 있으면 매번 실행되는 이 부분이 계속 실행된까 문제가 된다....
  //그래서 캐시 그런게.. 존재하는 것. (나중에 나오겠지)

  return (
    <div className='grid place-items-center h-screen'>
      <h1 className='text-3xl'>count: {count}</h1>
      <My session={session} logout={logout} login={login} />
      <Hello name={session.loginUser?.name} age={session.loginUser?.age} plusCount={plusCount}>반갑다고</Hello>
    </div > //어 그런데 여기서 setCount처럼 stateAction을 직접 주는 것은 안티패턴!!
  );
}

export default App;
