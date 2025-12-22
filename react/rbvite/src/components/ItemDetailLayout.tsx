import { useSession, type ItemType } from '@/hooks/SessionContext';
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom';

export default function ItemDetailLayout() {
    const { session: { cart } } = useSession();
    const params = useParams();
    const id = Number(params.id)
    const contextItem = useOutletContext<ItemType>();
    const item = contextItem || cart.find((item) => item.id === id)
    //매번 find를 해주기 힘드니까 outlet에 context로 주기
    // url로 딱 해당 item id로 들어오면, 그때만 find
    if (!item) return <Navigate to={'/items'} />

    return (
        <>
            <h1 className='text-center'>ItemDetailLayout(상품명): {item.name}</h1>
            <div className='border border-violet-950'>
                <Outlet context={item} />
            </div>
        </>
    )
}