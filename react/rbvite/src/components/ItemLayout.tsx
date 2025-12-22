import { useSession, type ItemType } from '@/hooks/SessionContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Btn from './ui/Btn';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/Button';

export default function ItemLayout() {
    const { session: { cart } } = useSession();
    const navigate = useNavigate();
    const [item, setItem] = useState<ItemType>()

    return <div className='w-full'>
        <div className='grid grid-cols-4 gap-2'>
            <div className='borderx'>
                <h2 className='text-xl mb-3'>Cart</h2>
                <ul className='ml-2'>
                    {cart?.map((item) => {
                        return <li key={item.id}>
                            {/* <Link to={`${id}`}>{name}</Link> */}
                            <Button onClick={() => setItem(item)} variant={'link'}>{item.name}</Button>
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
                    <Outlet context={item} />
                </div>
            </div>
        </div>
    </div >
}