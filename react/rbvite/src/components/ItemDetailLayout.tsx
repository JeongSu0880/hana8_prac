import { useSession } from '@/hooks/SessionContext';
import { Navigate, Outlet, useParams } from 'react-router-dom';

export default function ItemDetailLayout() {
    const { session: { cart } } = useSession();
    const params = useParams();
    const id = Number(params.id)
    const { name } = cart.find((item) => item.id === id)

    if (!name) return <Navigate to={'/items'} />

    return (
        <>
            <h1 className='text-center'>ItemDetailLayout(상품명): {name}</h1>
            <div>
                <Outlet />
            </div>
        </>
    )
}