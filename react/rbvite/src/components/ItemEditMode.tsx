import type { Session } from '../App'
import InputItem from './InputItem'
import Button from './ui/Button'

type Prop = {
    addItem: (name: string, price: number) => void
    modItem: (name: string, price: number) => void
    session: Session;
    resetClick: () => void
}

export function ItemEditMode({ modItem, addItem, session, resetClick }: Prop) {
    return (
        <div className='flex'>
            <InputItem modItem={modItem} addItem={addItem} session={session}></InputItem>
            <Button onClick={resetClick} className='bg-amber-100 rounded-lg'>취소</Button>
        </div>
    )
}