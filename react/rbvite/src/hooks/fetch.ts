import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { isErrorWithMessage } from '../libs/utils';

// export function useFetch(url: string) {
//     const [data, setData] = useState([]);//이거 타입을 어떻게 잡아주면 좋을까?\ 
//     // const dataRef = useRef(undefined)

//     useEffect(() => {
//         const controller = new AbortController();
//         const { signal } = controller;

//         // fetch('/data/sample.json', { signal }).then(res => res.json()).then((data) => dataRef.current = data)
//         (async () => {
//             const res = await fetch(url, { signal })
//             const data = await res.json();
//             // dataRef.current = data
//             setData(data)
//             // console.log(data)
//         })();
//         return () => controller.abort();
//     }, [data])

//     return { data }
// }
// 아웃!

export function useFetch<T>(url: string, deps: unknown[] = []) {
    const [data, setData] = useState<T>();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useLayoutEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        // const f = async() = {
        //     setLoading(true)
        //      try{
        //     const res = await fetch(...);
        //     if (res.ok)...
        //     const data = await res.json()
        //     setData(data)
        // } catch(err) 
        // }
        // f() 이런식으로도 할 수 있단다~
        setLoading(true) // 만약에 isLoading을 deps에 넣어주면 무한루프 돌 수도 있어

        fetch(url, { signal }).then(res => {
            if (res.ok) throw Error(`${res.status} ${res.statusText || 'Error!!'}`)
            return res.json();
        })
            .then(setData)
            .catch((err: unknown) => { //error는 항상 unknown
                if (!signal.aborted) setError(isErrorWithMessage(err) ? err.message : JSON.stringify(err));// 맨 처음에 스트릭트 모드로 인해서 언마운트 될 때도 err로 잡힘 이걸 건너 뛰는 것.
            }).finally(() => setLoading(false))

        return () => controller.abort();
    }, deps)
    return { data, isLoading, error }
}


//deps를 빈배열로 주면? 최초 마운트 시 1번 실행
//deps를 안주면? 계에속 실행