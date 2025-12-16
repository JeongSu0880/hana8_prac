import { useEffect, useRef, useState } from 'react';

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
