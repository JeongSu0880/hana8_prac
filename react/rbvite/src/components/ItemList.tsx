import type { Session } from '../App';
import { ItemEditMode } from './ItemEditMode';
import ItemReadMode from './ItemReadMode';
import { useEffect, useState } from 'react';

type Prop = {
    session: Session;
    id: number;
    name: string;
    price: number;
    removeItem: (id: number) => void;
    addItem: (name: string, price: number) => void
    modItem: (name: string, price: number) => void
};

export default function ItemList({ id, name, price, session, removeItem, addItem, modItem }: Prop) {
    const [click, setClick] = useState(false);

    useEffect(() => {
        console.log("변경된 click:", click);
    }, [click]);
    const resetClick = () => {
        setClick((c) => !c)
    }
    return (
        <li key={id} onClick={() => setClick(true)}>
            {click === true ?
                <ItemEditMode resetClick={resetClick} session={session} addItem={addItem} modItem={modItem} />
                : <ItemReadMode id={id} name={name} price={price} removeItem={removeItem} />}
        </li>
    )
}