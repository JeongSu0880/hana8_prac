import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from './ui/button';

export default function NotFound() {
    const navigate = useNavigate();
    return (<>
        <h1 className='text-primary'>PAGE NOT FOUND (404)</h1>
        <div>
            <Button onClick={() => navigate('/')}></Button>
            <Button onClick={() => navigate(-1)}></Button>
            {location.pathname === '/xxx' && <Navigate to='/' />}
        </div>
    </>)
}