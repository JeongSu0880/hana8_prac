import { useSession, type ItemType } from '@/hooks/SessionContext';
import { FilePlus2Icon, RotateCcwIcon, SaveIcon } from 'lucide-react';
import { useRef, useState, type FormEvent, type RefObject } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import Btn from './ui/Btn';
import LabelInput from './ui/LabelInput';

export default function ItemEdit() {
    const item = useOutletContext<ItemType>();
    const navigate = useNavigate();

    const { saveItem } = useSession();
    const [isEditing, setEditing] = useState(!item.id);
    const [hasDirty, setDirty] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    if (!item) return <Navigate to={'/items'} />;

    const checkDirty = () => {
        setDirty(
            item.name !== nameRef.current?.value ||
            item.price !== Number(priceRef.current?.value)
        );
    };

    const editItem = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const price = priceRef.current?.value;
        let msg;
        let ref: RefObject<HTMLInputElement | null> | null = null;

        if (!name) {
            // alert('Input the item name!');
            // nameRef.current?.focus();
            msg = 'Input the item name!';
            ref = nameRef;
        }

        if (!price) {
            // alert('Input the item price!');
            // priceRef.current?.focus();
            ref = priceRef;
        }

        if (msg) {
            alert(msg);
            if (ref && ref.current) ref.current.focus();
            return;
        }

        saveItem({ id: item.id, name: name ?? '', price: Number(price) });

        // 정리작업..
        if (nameRef.current && priceRef.current) {
            nameRef.current.value = '';
            priceRef.current.value = '';
            nameRef.current.focus();
        }
        setEditing(false);
        setDirty(false);
    };

    const cancelEdit = () => {
        setEditing(!isEditing);
        if (nameRef.current && priceRef.current) {
            nameRef.current.value = item.name;
            priceRef.current.value = String(item.price);
        }
    };
    return (
        <>
            <form onSubmit={editItem} className='flex gap-1'>
                {/* <input type='number' ref={idRef} placeholder='id...' className='w-14' /> */}
                <LabelInput
                    ref={nameRef}
                    defaultValue={item.name}
                    onChange={checkDirty}
                    placeholder='name...'
                />
                <LabelInput
                    type='number'
                    ref={priceRef}
                    defaultValue={item.price}
                    onChange={checkDirty}
                    placeholder='price...'
                />
                <Btn onClick={() => {
                    cancelEdit()
                    navigate(-1)
                }} type='reset' className=''>
                    <RotateCcwIcon />
                </Btn>
                {/* <Button ><Trash2Icon /></Button> */}
                {hasDirty && (
                    <Btn onClick={() => { navigate(`/items`) }} type='submit' className='text-blue-500' disabled={!hasDirty}>
                        {item.id ? <SaveIcon /> : <FilePlus2Icon />}
                    </Btn>
                )}
            </form>
        </>
    )
}

// 기존의 문제점
// 버튼 컴포넌트을 링크 컴포넌트로 감싸면 링크 혹은 버튼의 onclick이벤트가 씹힐 수 잇다.
// 그래서 submit을 하는 버튼을 눌러보 url은 잘 바뀌는데 상품 수정이 안 되었던 것!
// useNavigate()를 쓰자