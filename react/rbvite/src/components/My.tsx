import type { Session, LoginFunction } from '../App';
import Login from './Login';
import Profile from './Profile';
import InputItem from './InputItem';
import ItemList from './ItemList';

type Prop = {
    session: Session;
    login: LoginFunction;
    logout: () => void;
    removeItem: (id: number) => void
    addItem: (name: string, price: number) => void
    modItem: (name: string, price: number) => void
};

export default function My({ session, logout, login, removeItem, addItem, modItem }: Prop) {
    return (
        <>
            {session?.loginUser ? (
                <Profile loginUser={session.loginUser} logout={logout} />
            ) : (
                <Login login={login} />
            )}
            <hr />
            <ul>
                {session.cart.map(({ id, name, price }) => (
                    <ItemList id={id} name={name} price={price} session={session} removeItem={removeItem} addItem={addItem} modItem={modItem} />
                ))}
            </ul>
            <InputItem modItem={modItem} addItem={addItem} session={session}></InputItem>
        </>
    );
}
