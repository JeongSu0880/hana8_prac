// 왜 이 파일 tsx 썼어?
//Provier도 jsx를 리턴하니까

import { createContext, use, useState, type PropsWithChildren } from 'react';

type ContextValue = {
    count: number;
    plusCount: (n: number) => void;
}// Context는 value안의 값들의 타입 (그냥 마우스 올리면 나와 )

// context  사용 절차ㅓ
// 1. createContext
const CounterContext = createContext<ContextValue>({ count: 0, plusCount: () => { } });
// const CounterContext = createContext<ContextValue | undefined>(undefined);
// 아래것처럼 쓸 수 있긴 한데 이렇게 하면 사용하는 쪽에서 계에속 ? 붙여서 검사해야함.

// 2. Provider
// CounterContext.
export function CounterProvider({ children }: PropsWithChildren) {
    const [count, setCount] = useState(0);

    const plusCount = (n = 1) => setCount((prevCount) => prevCount + n);

    return <CounterContext.Provider value={{ count, plusCount }}>
        {children}
    </CounterContext.Provider>
}

//children은 이 컨텍스트를 다 쓸 수 있어. 그래서 consumer들ㅇ 되는거임

// 3. useCounter 
export const useCounter = () => use(CounterContext);

// 상태를 안썻는데 왜 훅이에요?
// value가 상태입니다. Provider가 상태를 value 라는 속성에 숨긴거예요.