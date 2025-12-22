<<<<<<< HEAD
=======
// useInterval(() => setGoodSec((p) => p + 1, 1000);
>>>>>>> 20251219

import { useEffect, useRef, useState } from 'react';

// useInterval(console.log, 1000, x, y, z);
export function useInterval_OLD<T extends (...args: Parameters<T>) => void>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
  console.log('args>>', args);
  useEffect(() => {
    console.log('11111111111111');
    const intl = setInterval(() => {
      console.log('*********', args);
      cb(...args);
    }, delay);
    // cb(...args);
    return () => {
      console.log('2222222222222');
      clearInterval(intl);
    };
  }, []);
}

<<<<<<< HEAD
function useTime<T extends (...arge: Parameters<T>) => void>(
=======
function useTime<T extends (...args: Parameters<T>) => void>(
>>>>>>> 20251219
  f: typeof setTimeout | typeof setInterval,
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
  // const [timer, setTimer] = useState<ReturnType<typeof f>>();
<<<<<<< HEAD
=======
  // const dtimer = useDeferredValue(timer);
>>>>>>> 20251219
  const timerRef = useRef<ReturnType<typeof f>>(undefined);

  const setTime = () => {
    timerRef.current = f(() => {
      cb(...args);
<<<<<<< HEAD
      timerRef.current = undefined
=======
      if (f === setTimeout) timerRef.current = undefined;
>>>>>>> 20251219
    }, delay);
  };
  // const clear = () =>
  //   f === setTimeout
  //     ? clearTimeout(timerRef.current)
  //     : clearInterval(timerRef.current);
  const clear = () => {
    if (!timerRef.current) return;
    (f === setTimeout ? clearTimeout : clearInterval)(timerRef.current);
<<<<<<< HEAD
    timerRef.current = undefined
  }

  const reset = () => {
=======
    timerRef.current = undefined;
  };

  const reset = () => {
    console.log('*********', timerRef.current);
>>>>>>> 20251219
    clear();
    setTime();
  };

  useEffect(() => {
    setTime();

    return clear;
  }, []);

  return { clear, reset, timerRef };
}
<<<<<<< HEAD
=======
// function time_OLD<T extends () => void>(
//   f: typeof setTimeout | typeof setInterval,
//   cb: T,
//   delay: number,
//   ...args: Parameters<T>
// ) {
//   const [timer, setTimer] = useState<ReturnType<typeof f>>();

//   const setTime = () => {
//     const timer = f(cb, delay, ...args);
//     setTimer(timer);
//     return timer;
//   };
//   const clear = (t?: ReturnType<typeof f>) =>
//     f === setTimeout ? clearTimeout(t || timer) : clearInterval(t || timer);
//   const reset = () => {
//     clear();
//     // setTimer(f(cb, delay, ...args));
//     setTime();
//   };

//   useEffect(() => {
//     // const timer = f(cb, delay, ...args);
//     // setTimer(timer);

//     // setTimer(f(cb, delay, ...args));
//     const timer = setTime();

//     // return () => clearTimeout(timer);
//     return () => clear(timer);
//   }, []);

//   return { clear, reset };
// }
>>>>>>> 20251219

export function useInterval<T extends (...args: Parameters<T>) => void>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
  return useTime(setInterval, cb, delay, ...args);
}

export function useTimeout<T extends (...args: Parameters<T>) => void>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
  return useTime(setTimeout, cb, delay, ...args);
}

<<<<<<< HEAD
=======
// const [searchStr, setSearchStr] = useState('');
// const dv = useDebounce(searchStr, delay) ===> filter
>>>>>>> 20251219
export function useDebounce<T>(state: T, delay: number, deps: unknown[] = []) {
  const [debouncedValue, setDebouncedValue] = useState<T>(state);
  const { reset } = useTimeout(() => setDebouncedValue(state), delay);
  useEffect(() => {
    reset(); // clear & setTimeout
  }, [state, ...deps]);

  return debouncedValue;
}

export function useDebounceWithoutTimerHook<T>(
  state: T,
  delay: number,
  deps: unknown[] = []
) {
  const [debouncedValue, setDebouncedValue] = useState<T>(state);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(state), delay);

    return () => clearTimeout(timer);
  }, [state, ...deps]);

  return debouncedValue;
}

<<<<<<< HEAD
export function useThrottleWithoutTimerHook<T>(state: T, delay: number, deps: unknown[] = []) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [throttleValue, setThrottleValue] = useState<T>(state);
  useEffect(() => {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      setThrottleValue(state)
      timerRef.current = undefined
    })

    // return () => clearTimeout(timerRef.current);이걸 넣게 되면 throttle의 의도한대로 단위시간마나 무조건 한번은 실행이 안지켜짐. 왜냐면 state가 바뀔때마다timer가 초기와회니따
  }, [state, ...deps])
  // 항상 useEffect는 state가 바뀌면 언마운트부터 실행이 된다는 점.

  return throttleValue
}//단위시간동안 한번은 실행이 되도록

export function useThrottle<T>(state: T, delay: number, deps: unknown[] = []) {
  const [throttleValue, setThrottleValue] = useState<T>(state);
  const { timerRef, reset } = useTimeout(setThrottleValue, delay, state);
  useEffect(() => {
    if (timerRef.current) return;
    reset();

    // return () => clearTimeout(timerRef.current);이걸 넣게 되면 throttle의 의도한대로 단위시간마나 무조건 한번은 실행이 안지켜짐. 왜냐면 state가 바뀔때마다timer가 초기와회니따
  }, [state, ...deps])
  // 항상 useEffect는 state가 바뀌면 언마운트부터 실행이 된다는 점.

  return throttleValue
}//단위시간동안 한번은 실행이 되도록
//1. 왜 검색할 때 애초에 debounce와 throttle을 사용하는지?
//2. useEffect를 왜 사용하는지,,,


// useRef를 사용한 이유?
// useDeferredValue
=======
export function useThrottle<T>(state: T, delay: number, deps: unknown[] = []) {
  const [throttledValue, setThrottledValue] = useState<T>(state);
  const { timerRef, reset } = useTimeout(setThrottledValue, delay, state);
  useEffect(() => {
    if (timerRef.current) return;
    reset();
  }, [state, ...deps]);

  return throttledValue;
}
export function useThrottleWithoutTimeHook<T>(
  state: T,
  delay: number,
  deps: unknown[] = []
) {
  const [throttledValue, setThrottledValue] = useState<T>(state);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    if (timerRef.current) return;

    timerRef.current = setTimeout(() => {
      setThrottledValue(state);
      timerRef.current = undefined;
    }, delay);

    // return () => {
    //   clearTimeout(timerRef.current);
    //   timerRef.current = undefined;
    // };
  }, [state, ...deps]);

  return throttledValue;
}
>>>>>>> 20251219
