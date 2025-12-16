// useInterval(() => setGoodSec((p) => p + 1, 1000)

import { useCallback, useEffect, useRef, useState } from 'react';

// export function useInterval<T extends (...args: any[]) => void>(cb: T, delay: number, ...args: Parameters<T>) {
//     useEffect(() => { // 왜 useEffet? 상태가 따로 없기 때문에
//         const intl = setInterval(cb, delay, ...args);
//         return () => clearInterval(intl)
//     }, [])
// }

//useEffect는 싱글톤이고

// export function useTimeout<T extends (...args: any[]) => void>(
//     cb: T,
//     delay: number,
//     ...args: Parameters<T>
// ) {
//     const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
//     const clear = useCallback(() => {
//         clearTimeout(timer)
//     }, [])
//     const reset = useCallback(() => {
//         clear();
//         setTimer(setTimeout(cb, delay, ...args))
//     }, [])
//     useEffect(() => {
//         const timer = setTimeout(cb, delay, ...args);
//         setTimer(timer)
//         return () => clearTimeout(timer)
//     }, [])
//     return { clear, reset }
// }


function time<T extends () => void>(f: typeof setTimeout | typeof setInterval, cb: T, delay: number, ...args: Parameters<T>) {
    const [timer, setTimer] = useState<ReturnType<typeof f>>();
    const setTime = () => setTimer(f(cb, delay, ...args))
    const clear = () => f === setTimeout ? clearTimeout(timer) : clearInterval(timer)
    const reset = () => {
        clear();
        setTime();
    }
    useEffect(() => {
        // const timer = setTimeout(cb, delay, ...args);
        // setTimer(timer)
        return clear
    }, [])
    return { clear, reset }
}

export function useTimeout<T extends (...args: any[]) => void>(
    cb: T,
    delay: number,
    ...args: Parameters<T>
) {
    return time(setTimeout, cb, delay, ...args)
}

export function useInterval<T extends (...args: any[]) => void>(
    cb: T,
    delay: number,
    ...args: Parameters<T>
) {
    return time(setInterval, cb, delay, ...args)
}