import { Link } from 'react-router-dom';
import { useSession } from './hooks/SessionContext';

export default function Nav() {
    const { session: { loginUser } } = useSession();
    return <nav>
        <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/my'}>My</Link></li>
            <li><Link to={'/login'}>Login</Link></li>
        </ul>
        <small>{loginUser?.name}</small>
    </nav>
}