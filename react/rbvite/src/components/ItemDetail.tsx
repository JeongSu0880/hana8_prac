import { type ItemType } from '@/hooks/SessionContext';
import { Link, Navigate, useOutletContext } from 'react-router-dom';

export default function ItemDetail() {
    const item = useOutletContext<ItemType>();

    // const item = cart.find((item) => item.id === id)
    if (!item) return <Navigate to={`/item`} />

    return (
        <>
            <div className='p-5'>
                <h1 className='text-center font-bold'>{item.id}. ItemDetail(금액): {item.price}</h1>
            </div>

            <div className='flex items-center justify-center'>
                <Link className='m-3' to={`../`}>목록</Link>
                <Link className='m-3' to={`./edit`} >수정</Link>
            </div >
        </>
    )
}