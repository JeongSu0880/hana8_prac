'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = () => router.back();

  const onClick = (e: PointerEvent) => {
    if (e.target === overlay.current || e.target === wrapper.current) {
      onDismiss();
    }
  };

  // const onClick = (e: PointerEvent) => {
  //     onDismiss();
  // }; //만약 이렇게 하면? 이벤트 버블링이 일어나서 어딜 클릭해도 꺼진다.

  const onKeyDown = (e: KeyboardEvent) => {
    overlay.current?.removeEventListener('click', onClick);
    if (e.key === 'Escape') onDismiss();
  };

  // const [x, toggle] = useReducer((p) => !p, false);
  useEffect(() => {
    console.log('*********************');
    overlay.current?.addEventListener('click', onClick); // 어떻게 overlay가 존재하는지 알 수 있냐? useEffect는 무조건 DOM 이 생성된 후에 실행
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
  // 이건 useCallback을 쓰지 않아도 메모이제이션이 되고 있다. (react 19 컴파일러를 쓰고 있기 때문에)

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: click하면 close!
    // biome-ignore lint/a11y/useKeyWithClickEvents: click하면 close!
    <div
      ref={overlay}
      className="fixed top-0 right-0 bottom-0 left-0 z-10 mx-auto bg-black/60 p-10"
    >
      <div
        ref={wrapper}
        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 bg-white-200 p-6 sm:w-10/12 md:w-8/12 lg:w-2/5"
      >
        <button
          onClick={onDismiss}
          className="absolute top-0 right-2 hover:text-slate-400"
        >
          X
        </button>
        <div className="bg-white">{children}</div>
      </div>
    </div>
  );
}
