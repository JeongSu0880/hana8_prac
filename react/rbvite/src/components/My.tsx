import type { Session, LoginFunction } from '../App';
import Login, { type LoginFocusHandler } from './Login';
import Profile, { type ProfileHandler } from './Profile';
import InputItem from './InputItem';
import ItemList from './ItemList';
import { useRef, type RefObject } from 'react';

type Prop = {
    session: Session;
    login: LoginFunction;
    logout: () => void;
    removeItem: (id: number) => void
    addItem: (name: string, price: number) => void
    modItem: (name: string, price: number) => void
    ref: RefObject<LoginFocusHandler | null>
};

export default function My({ session, logout, login, removeItem, addItem, modItem, ref }: Prop) {
    const profileHandlerRef = useRef<ProfileHandler>(null);

    return (
        <>
            {session?.loginUser ? (
                <Profile ref={profileHandlerRef} loginUser={session.loginUser} logout={logout} />
            ) : (
                <Login ref={ref} login={login} />
            )}
            <hr />
            <a href='#!' onClick={e => {
                e.preventDefault();
                profileHandlerRef.current?.logout();
                //부모가자식을 마음껏 컨트롤하고 싶을 때
                //ex) map을 사용할 때, api를 연동해서 사용하기 때문에 

            }}>아이템</a>
            <ul>
                {session.cart.map(({ id, name, price }) => (
                    <ItemList id={id} name={name} price={price} session={session} removeItem={removeItem} addItem={addItem} modItem={modItem} />
                ))}
                {/* 이렇게 하면 안된다고 */}
            </ul>
            <InputItem modItem={modItem} addItem={addItem} session={session}></InputItem>
        </>
    );
}
