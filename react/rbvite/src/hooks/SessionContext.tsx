import { createContext, use, useRef, useState, type PropsWithChildren } from 'react';
import type { LoginHandler } from '../components/Login';

//1. createContext
type Item = {
    id: number;
    name: string;
    price: number;
    isSoldOut?: boolean;
};
export type LoginUser = { id: number; name: string; age: number };
export type LoginFunction = (name: string, age: number) => void;

export type Session = {
    loginUser: LoginUser | null;
    cart: Item[];
};

type ContextValue = {
    session: Session;
    addItem: (name: string, price: number) => void;
    removeItem: (id: number) => void;
    modItem: (name: string, price: number) => void;
    login: LoginFunction
    logout: () => void

}
const DefaultSession: Session = {
    loginUser: null,
    // loginUser: { id: 1, name: "Hong", age: 22 },
    cart: [
        { id: 100, name: '라면', price: 3000 },
        { id: 101, name: '컵라면', price: 2000 },
        { id: 200, name: '파', price: 5000 },
    ],
};
const SessionContext = createContext<ContextValue>({
    session: DefaultSession,
    login: () => { },
    removeItem: () => { },
    addItem: () => { },
    modItem: () => { },
    logout: () => { },
});


//2. Provide Context



export function SessionProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session>(DefaultSession);
    const loginRef = useRef<LoginHandler>(null)

    const login: LoginFunction = (name, age) => {
        loginRef.current?.validate();
        setSession({ ...session, loginUser: { id: 1, name, age } })
    }

    const logout = () => {
        setSession({ ...session, loginUser: null })
    }
    const addItem = (name: string, price: number) => {
        const newItem = {
            id: Math.max(...session.cart.map(item => item.id), 0) + 1,//max는 arr로 받을 수가 없다.
            name, price
        }

        setSession({
            ...session,
            cart: [...session.cart, newItem]
        })
    }

    const removeItem = (id: number) => {
        if (!confirm('Are u sure?')) return;
        setSession({
            ...session,
            cart: session.cart.filter(i => i.id !== id)
        });
        // session.cart = [...session.cart.filter(i => i.id !== id)];
    } //세션의 주소도 바뀌고 카드의 주소도 바뀌엇다.

    const modItem = (name: string, price: number) => {
        const item = session.cart.find(i => i.name === name)
        if (item) item.price = price;
        setSession(
            { ...session }
        )
    }



    return (
        <SessionContext.Provider value={{ session, modItem, addItem, removeItem, login, logout }}>
            {children}
        </SessionContext.Provider>
    )

}


//3. Consume Context

export const useSession = () => use(SessionContext);