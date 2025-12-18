import { useCounter } from '@/hooks/CounterContext';
import Hello from './Hello';

export default function Home() {
    const { count } = useCounter();
    return (<>
        <h1 className='text-3xl'>count: {count}</h1>
        {count < 50 && <Hello>반갑습니다</Hello>}
    </>)
}