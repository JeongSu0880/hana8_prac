import { Route, Routes } from 'react-router-dom';
import Hello from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/SessionContext';
import Nav from './Nav';
import Home from './components/Home';
import Posts from './components/Post';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className='grid place-items-center h-screen mx-2'>

      <SessionProvider>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my' element={<My />} />
          <Route path='/hello' element={<Hello />} />
          <Route path='/posts' element={<Posts />} />
        </Routes>

      </SessionProvider>
    </div>
  );
}

export default App;
