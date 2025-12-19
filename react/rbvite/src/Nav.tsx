import { Link, NavLink } from 'react-router-dom';
import { useSession } from './hooks/SessionContext';

export default function Nav() {
    const { session: { loginUser } } = useSession();
    return <nav className='flex justify-between m-5'>
        <ul className='flex gap-5'>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/my'}>My</NavLink></li>
            <li><NavLink to={'/profile'}>Profile</NavLink></li>
            <li><NavLink to={'/items'}>Items</NavLink></li>
            <li><NavLink to={'/hello'}>Hello</NavLink></li>
            <li><NavLink to={'/posts'}>Posts</NavLink></li>
        </ul>
        <div>
            {loginUser?.name ? loginUser.name : 'Login'}
        </div>
    </nav>
}