import type { Session, LoginFunction } from '../App';
import Login from './Login';
import Profile from './Profile';
import Button from './ui/Button';
import Small from './ui/Small';

type Prop = {
    session: Session;
    login: LoginFunction;
    logout: () => void;
    removeItem: (id: number) => void
};

export default function My({ session, logout, login, removeItem }: Prop) {
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
                    <li key={id}>
                        <Small className=''>{id}. </Small>
                        {name}
                        <Small className='text-gray-500'>{price.toLocaleString()}</Small>
                        <Button
                            onClick={() => removeItem(id)}
                            className='ml-2 px-1 py-0 bg-amber-600 hovervu-lg 
                        transicion duration-300 active:scale-150'>X</Button>
                    </li>
                ))}
            </ul>
        </>
    );
}
