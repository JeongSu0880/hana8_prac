import { FilePlus2Icon } from 'lucide-react';
import Button from './ui/Button';
import LabelInput from './ui/LabelInput';
import { useRef, type FormEvent, type RefObject } from 'react';
import type { Session } from '../App';

type Prop = {
    session: Session;
    addItem: (name: string, price: number) => void
    modItem: (name: string, price: number) => void
}

export default function InputItem({ session, addItem, modItem }: Prop) {
    const priceRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)


    const editItem = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const price = priceRef.current?.value || 0;

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
            modItem(name ?? '', Number(price)) : addItem(name ?? '', Number(price));

        if (nameRef.current && priceRef.current) {
            nameRef.current.value = '';
            priceRef.current.value = '';
        }
    }

    return (
        <>
            <form onSubmit={editItem} className='flex gap-1'>
                {/* <input placeholder='id...' ref={idRef} className='w-10' /> */}
                <LabelInput placeholder={'name...'} ref={nameRef} />
                <LabelInput placeholder={'price...'} type='number' ref={priceRef} />
                <Button type='submit' className='text-blue-600'>
                    {/* <SaveIcon /> */}
                    <FilePlus2Icon />
                </Button>
            </form>
        </>
    )
}