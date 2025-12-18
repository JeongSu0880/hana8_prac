import { useCounter } from '@/hooks/CounterContext';

export default function Home() {
    const { count } = useCounter();
    return (<>HOME</>)
}