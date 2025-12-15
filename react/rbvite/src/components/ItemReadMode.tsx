import Button from './ui/Button';
import Small from './ui/Small';

type Prop = {
    id: number;
    name: string;
    price: number;
    removeItem: (id: number) => void;
}

export default function ItemReadMode({ id, name, price, removeItem }: Prop) {
    return (
        <>
            <Small className=''>{id}. </Small>
            {name}
            <Small className='text-gray-500'>{price.toLocaleString()}</Small>
            <Button
                onClick={() => removeItem(id)}
                className='ml-2 px-1 py-0 bg-amber-600 hovervu-lg 
                                transicion duration-300 active:scale-150'>X
            </Button>
        </>
    )
}