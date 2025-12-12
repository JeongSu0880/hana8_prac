import type { Session, LoginFunction } from "../App";
import Login from "./Login";
import Profile from "./Profile";
import Small from "./ui/Small";

type Prop = {
    session: Session;
    login: LoginFunction;
    logout: () => void;
}

export default function My({ session, logout, login }: Prop) {
    return <>
        {session?.loginUser ? <Profile loginUser={session.loginUser} logout={logout} /> : <Login login={login} />}
        <hr />
        <ul>
            {
                session.cart.map(({ id, name, price }) => (
                    <li key={id}>
                        <Small className=''>{id}. </Small>
                        {name}
                        <Small className='text-gray-500'>{price.toLocaleString()}</Small>
                    </li>
                ))
            }
        </ul>
    </>;
}