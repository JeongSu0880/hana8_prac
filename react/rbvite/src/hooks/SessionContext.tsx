import {
  createContext,
  use,
  useReducer,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from 'react';
import type { LoginHandler } from '../components/Login';

export type ItemType = {
  id: number;
  name: string;
  price: number;
  isSoldOut?: boolean;
};

export type LoginUser = { id: number; name: string; age: number };

export type Session = {
  loginUser: LoginUser | null;
  cart: ItemType[];
};

export type LoginFunction = (name: string, age: number) => void;

type SessionContextValue = {
  session: Session;
  login: LoginFunction;
  logout: () => void;
  loginHandlerRef: RefObject<LoginHandler | null> | null;
  removeItem: (id: number) => void;
  saveItem: (item: ItemType) => void;
};

const DefaultSession = {
  // loginUser: null,
  loginUser: { id: 1, name: 'Hong', age: 33 },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

const SessionContext = createContext<SessionContextValue>({
  session: DefaultSession,
  login: () => { },
  logout: () => { },
  loginHandlerRef: null,
  removeItem: () => { },
  saveItem: () => { },
});

type Action =
  | { type: 'LOGIN'; payload: LoginUser }
  | { type: 'LOGOUT'; payload: null }
  // | { type: 'ADD-ITEM'; payload: Omit<ItemType, 'id'> }
  | { type: 'ADD-ITEM'; payload: ItemType }
  | { type: 'EDIT-ITEM'; payload: ItemType }
  | { type: 'REMOVE-ITEM'; payload: number };
// type을 const enum으로 정의해놓고 쓰는 방법도 있다.

const reducer = (session: Session, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN':
    case 'LOGOUT':
      return { ...session, loginUser: payload };
    case 'ADD-ITEM':
      return { ...session, cart: [...session.cart, payload] };
    case 'EDIT-ITEM':
      return {
        ...session,
        cart: session.cart.map((item) =>
          item.id === payload.id ? payload : item
        ),
      };
    case 'REMOVE-ITEM':
      return {
        ...session,
        cart: session.cart.filter((item) => item.id !== payload),
      };
    default:
      return session;
  }
};

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, dispatch] = useReducer(reducer, DefaultSession);

  const loginHandlerRef = useRef<LoginHandler>(null);

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
  };

  const login: LoginFunction = (name, age) => {
    if (loginHandlerRef.current?.validate())
      dispatch({ type: 'LOGIN', payload: { id: 1, name, age } });
  };

  const removeItem = (id: number) => {
    if (!confirm('Are u sure?')) return;

    dispatch({ type: 'REMOVE-ITEM', payload: id });
  };

  const saveItem = ({ id, name, price }: ItemType) => {
    const item = id && session.cart.find((item) => item.id === id);

    if (item) {
      dispatch({ type: 'ADD-ITEM', payload: { id, name, price } });
    } else {
      const newItem = {
        id: Math.max(...session.cart.map((item) => item.id), 0) + 1,
        name,
        price,
      };
      dispatch({ type: 'EDIT-ITEM', payload: newItem });
    }
  };
  return (
    <SessionContext.Provider
      value={{ session, login, logout, loginHandlerRef, removeItem, saveItem }}
    >
      {children}
    </SessionContext.Provider>
  );
}


export const useSession = () => use(SessionContext);

/*
강사님 버전
1. 엑션 타입 이름 대문자
2. reducer의 로직 최대한 간소화, 겹치는 로직이 있다면 한번에 처리
3. 나머지는 다 Provider 함수에서 처리하면 되니까
4. logout 타입 잡을 때, payload: null 로 해주면 reducer에서 매번 옵셔널 검사를 하지 않아도 됨.
*/