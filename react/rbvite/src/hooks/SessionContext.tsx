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

type Action = {
  type: 'login',
  payload: {
    name: string,
    age: number
  },
  ref: RefObject<LoginHandler | null>
} | {
  type: 'logout'
} | {
  type: 'removeItem',
  payload: {
    id: number
  }
} | {
  type: 'saveItem',
  payload: {
    item: ItemType
  }
}

const reducer = (prevSession: Session, action: Action) => {
  switch (action.type) {
    case 'login': {
      if (action.ref.current?.validate()) {
        return { ...prevSession, loginUser: { id: 1, ...action.payload } }
      }
      return prevSession;
    }
    case 'logout': {
      return { ...prevSession, loginUser: null }
    }
    case 'saveItem': {
      const prevItem = prevSession.cart.find((item) => item.id === id);
      const { id, name, price } = action.payload.item
      if (prevItem) {
        // item.name = name;
        // item.price = price;// 아니 잠깐 왜 이렇게 쓰면 안좋다고 했드라.?
        return {
          ...prevSession,
          cart: prevSession.cart.map((item) =>
            item.id === id ? { ...action.payload.item } : item
          ),
        };
      } else {
        const newItem = {
          id: Math.max(...prevSession.cart.map((item) => item.id), 0) + 1,
          name: name,
          price: price
        };
        return { ...prevSession, cart: [...prevSession.cart, newItem] };
      }
    }
    case 'removeItem': {
      if (!confirm('Are u sure?')) return prevSession;
      return {
        ...prevSession,
        cart: prevSession.cart.filter((item) => item.id !== action.payload.id),
      }
    }
  }
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, dispatch] = useReducer(reducer, DefaultSession);
  const loginHandlerRef = useRef<LoginHandler>(null);

  const login = (name: string, age: number) => dispatch({
    type: 'login',
    payload: { name: name, age: age },
    ref: loginHandlerRef
  })
  const logout = () => dispatch({ type: 'logout' })
  const removeItem = (id: number) => dispatch({
    type: 'removeItem',
    payload: { id: id }
  })
  const saveItem = (item: ItemType) => dispatch({
    type: 'saveItem',
    payload: { item }
  })

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
// example
const reducer = (session, action) => {
  switch (action.type) {
    case 'login':
      return { ...session, loginUser: action.payload };
    case 'logout':
    …
    default:
      return session;
  }
};

// const [session, setSession] = useState({});
const [session, dispatch] = useReducer(reducer, {});
const logout = (...) => dispatch(...);
*/
//Reduce를 사용하는 때는 언제일까? 
// 하나의 상태를 계속해서 여러 함수들이 참조를 해서 변경을 해야할 때 한번에 선언할 수 있다는거
// 즉, 분산되어 있는 setState로직을 한번에 정리하고 싶을 때