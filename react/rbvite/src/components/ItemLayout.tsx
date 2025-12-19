import { useSession } from '@/hooks/SessionContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Btn from './ui/Btn';
import { PlusIcon } from 'lucide-react';

export default function ItemLayout() {
    const { session: { cart } } = useSession();
    const navigate = useNavigate();
    return <div className='w-full'>
        <div className='grid grid-cols-4 gap-2'>
            <div className='borderx'>
                <h2 className='text-xl mb-3'>Cart</h2>
                <ul className='ml-2'>
                    {cart?.map(({ id, name }) => {
                        return <li key={id}>
                            <Link to={`${id}`}>{name}</Link>
                        </li>
                    })}
                </ul>
                <li className='text-center'>
                    <Btn onClick={() => navigate('0')} className=''>
                        <PlusIcon />
                    </Btn>
                </li>
            </div>
            <div className='col-span-3'>
                <h1 className='text-xl text-center font-bold'>ItemsLayout(장바구니)</h1>
                <div className='border-gray-200 border-2 p-3'>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
}