'use client'; // 엄밀히 말하면 SayHello 안에 이걸 붙여야 함.
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SayHello from './SayHello';

export default function HelloPage() {
  const pathname = usePathname();

  return (
    <>
      <h1>Hello Page:{pathname}</h1>
      <SayHello name={'Next'} />
      {/* <Suspense fallback={<h1>,,,</h1>}> */}
      <SearcParamId />
      {/* </Suspense>{' '} */}
      {/* 이건 비동기만.. */}
    </>
  );
}

function SearcParamId() {
  const searchParam = useSearchParams();
  const params = new URLSearchParams(searchParam.toString());

  const id = searchParam.get('id');
  const name = searchParam.get('name');

  const router = useRouter();

  const make200 = () => {
    params.set('id', '200');
    //w주소를 아예 바꾼 것 PPR...,
    router.push(`${id}?${params.toString()}`);
  };
  return <button onClick={make200}>make 200</button>;
}

//page.tsx

//그러니까 문제는 useSearchParams가 버전이 업데이트 되면서 promise 반환으로 바뀌엇다.
//그래서 해당 훅을 사용하는 부분만 컴포넌트로 따로 빼고 Suspense를 감싸주면 된다.
//dev에서는 에러가 나지 않았다는 점!
// Suspense로 감싸는 부분은 검색엔진에 걸리지 않느다.
