import { useRef, type FormEvent, type RefObject } from 'react';
import type { Session, LoginFunction } from '../App';
import Login from './Login';
import Profile from './Profile';
import Button from './ui/Button';
import LabelInput from './ui/LabelInput';
import Small from './ui/Small';
import { FilePlus2Icon, FilePlusIcon, SaveIcon } from 'lucide-react';

type Prop = {
    session: Session;
    login: LoginFunction;
    logout: () => void;
    removeItem: (id: number) => void
    addItem: (name: string, price: number) => void
    modifyItem: (name: string, price: number) => void
};

export default function My({ session, logout, login, removeItem, addItem, modifyItem }: Prop) {
    const priceRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const editItem = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const price = priceRef.current?.value;

        let msg;
        let ref: RefObject<HTMLInputElement | null> | null = null;
        //안쪽의 null은 dom이 로드 안됐을 때 바깥은 초기화 null 허용.
        if (!name) {
            msg = 'Input the name!';
            ref = nameRef;
        }

        if (!price) {
            msg = 'Input the name!'
            ref = priceRef;
        }

        if (msg) {
            alert(msg);
            if (ref && ref.current)
                ref?.current?.focus();
            return;
        }

        session.cart.find(item => item.name === name) ?
            modifyItem(name ?? '', Number(price)) : addItem(name ?? '', Number(price));

        if (nameRef.current && priceRef.current) {
            nameRef.current.value = '';
            priceRef.current.value = '';
        }
    }
    return (
        <>
            {session?.loginUser ? (
                <Profile loginUser={session.loginUser} logout={logout} />
            ) : (
                <Login login={login} />
            )}
            <hr />
            <ul>
                {session.cart.map(({ id, name, price }) => (
                    <li key={id}>
                        <Small className=''>{id}. </Small>
                        {name}
                        <Small className='text-gray-500'>{price.toLocaleString()}</Small>
                        <Button
                            onClick={() => removeItem(id)}
                            className='ml-2 px-1 py-0 bg-amber-600 hovervu-lg 
                        transicion duration-300 active:scale-150'>X</Button>
                    </li>
                ))}
            </ul>
            <form onSubmit={editItem} className='flex gap-1'>
                {/* <input placeholder='id...' ref={idRef} className='w-10' /> */}
                <LabelInput placeholder='name...' ref={nameRef} />
                <LabelInput placeholder='price...' type='number' ref={priceRef} />
                <Button type='submit' className='text-blue-600'>
                    {/* <SaveIcon /> */}
                    <FilePlus2Icon />
                </Button>
            </form>
        </>
    );
}
