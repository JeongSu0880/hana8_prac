import type { PropsWithChildren } from 'react';

type Prop = {
  className: string;
  onClick?: () => void;
};

export default function Button({
  onClick,
  className,
  children,
}: PropsWithChildren<Prop>) {
  return (
    <button
      className={`border py-1 px-2 rounded-md cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

//기본적으로 린트는 한개의 파일에 한개의 컴포넌트만 export하는 것을 원칙으로 함.
// 그니까 리액트 할 때 그거 잘 알아야겠네... 엘리먼트에 어떤 속성이 추가되어있는지... !
