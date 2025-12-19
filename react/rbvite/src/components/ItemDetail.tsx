import { useSession } from '@/hooks/SessionContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from './ui/Button';

export default function ItemDetail() {
    const { session: { cart } } = useSession();
    const params = useParams();
    const id = Number(params.id)
    const item = cart.find((item) => item.id === id)
    if (!item) return <Navigate to={`/item`} />

    return (
        <>
            <div className='p-5'>
                <h1 className='text-center font-bold'>{id}. ItemDetail(금액): {item.price}</h1>
            </div>

            <div className='flex items-center justify-center'>
                <Link to={`../`}>
                    <Button className='bg-gray-300'>목록</Button>
                </Link>
                <Link to={`./edit`} >
                    <Button className='bg-gray-300'>수정</Button>
                </Link>
            </div >
        </>
    )
}