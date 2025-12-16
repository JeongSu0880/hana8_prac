import { createContext, use, useCallback, useReducer, type PropsWithChildren } from 'react';

type ContextValue = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
  multCount: (n: number) => void;
};

// 1. createContext
const CounterContext = createContext<ContextValue>({
  count: 0,
  plusCount: () => { },
  minusCount: () => { },
  multCount: () => { }
});

// 2. Provider
type Action = {
  type: 'plus' | 'minus' | 'mult',
  payload: number
}

const reducer = (preCount: number, { type, payload }: Action) => {
  switch (type) {
    case 'plus':
      return preCount + payload;
    case 'minus':
      return preCount - payload;
    case 'mult':
      return preCount * payload;
    default:
      return preCount
  }
}

// CounterContext.Provider value={{x:1, y: () => {}}}
export function CounterProvider({ children }: PropsWithChildren) {
  const [count, dispatch] = useReducer(reducer, 0)
  // const [count, setCount] = useState(0);

  const plusCount = useCallback(() => dispatch({ type: 'plus', payload: 1 }), []);
  const minusCount = useCallback(() => dispatch({ type: 'minus', payload: 1 }), []);
  const multCount = useCallback((n: number) => dispatch({
    type: 'mult', payload: n
  }), [])

  //그런데 리액트컴파일러가 새 버전에서는 코드가 바뀌지 안ㄶ은 함수는 주소를 바꾸지 ㅇ낳는다. 그래서 사실 이것도 자동화 되어있음

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount, multCount }}>
      {children}
    </CounterContext.Provider>
  );
}

// 3. useCounter
// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => use(CounterContext);
// const useCounter = () => useContext(CounterContext);
