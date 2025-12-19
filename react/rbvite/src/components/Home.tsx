import { useCounter } from '@/hooks/CounterContext';

export default function Home() {
    const { count } = useCounter();

    return (<>
        <h1 className='text-3xl'>Welcome!</h1>
        <h1 className='text-3xl'>count: {count}</h1>
    </>)
}