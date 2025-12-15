import { createContext, use, useReducer, type PropsWithChildren } from 'react';

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

  const plusCount = () => dispatch({ type: 'plus', payload: 1 });
  const minusCount = () => dispatch({ type: 'minus', payload: - 1 });
  const multCount = (n: number) => dispatch({
    type: 'mult', payload: n
  });

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
