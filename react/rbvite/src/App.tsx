import { Route, Routes } from 'react-router-dom';
import Hello from './components/Hello';
import My from './components/My';
import { useCounter } from './hooks/CounterContext';
import { SessionProvider } from './hooks/SessionContext';
import Nav from './Nav';
import Home from './components/Home';
import Posts from './components/Post';

function App() {
  // const [count, setCount] = useState(0);
  const { count } = useCounter();

  return (
    <div className='grid place-items-center h-screen mx-2'>
      <h1 className='text-3xl'>count: {count}</h1>
      <SessionProvider>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my' element={<My />} />
          <Route path='/hello' element={<Hello />} />
          <Route path='/posts' element={<Posts />} />
        </Routes>
        <My />
        {count < 50 && <Hello>반갑습니다</Hello>}
      </SessionProvider>
    </div>
  );
}

export default App;
