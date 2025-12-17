import {
  createContext,
  use,
  useReducer,
  useRef,
  type PropsWithChildren,
  type RefObject
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

const DefaultSession = {
  // loginUser: null,
  loginUser: { id: 1, name: 'Hong', age: 33 },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

type SessionContextValue = {
  session: Session;
  login: LoginFunction;
  logout: () => void;
  loginHandlerRef: RefObject<LoginHandler | null> | null;
  removeItem: (id: number) => void;
  saveItem: (item: ItemType) => void;
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
  const [session, dispatch] = useReducer(reducer, DefaultSession); // 초깃값 바꾸기
  const loginHandlerRef = useRef<LoginHandler>(null)

  const login: LoginFunction = (name, age) => {
    if (loginHandlerRef.current?.validate())
      dispatch({ type: 'LOGIN', payload: { id: 1, name, age } })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE-ITEM', payload: id })
  }

  const saveItem = ({ id, name, price }: ItemType) => {
    //아이디가 없다면 ADD이지만, 있다고 해서 무조건 EDIT은 아님. (값이 어떻게 조작되었을지 모르니까)
    const item = (id && session.cart.find((item) => item.id === id))

    if (item) {
      dispatch({ type: 'EDIT-ITEM', payload: { id, name, price } })
    } else {
      const newItem = {
        id: Math.max(...session.cart.map((item) => item.id)) + 1,
        name,
        price
      }
      dispatch({ type: 'ADD-ITEM', payload: newItem })
    }
  }

  return (
    <SessionContext.Provider value={{ login, logout, removeItem, saveItem, session, loginHandlerRef }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => use(SessionContext);
