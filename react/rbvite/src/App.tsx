import { Route, Routes } from 'react-router-dom';
import Hello from './components/Hello';
import Home from './components/Home';
import Login from './components/Login';
import My from './components/My';
import Posts from './components/Post';
import { SessionProvider } from './hooks/SessionContext';
import Nav from './Nav';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <SessionProvider>
        <Nav />
        <div className='grid place-items-center h-screen mx-2'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/my' element={<My />} />
            {/* <Route path='/profile' element={<Profile />} /> */}
            {/* <Route path='/items' element={<Items />} /> */}
            <Route path='/hello' element={<Hello />} />
            <Route path='/posts' element={<Posts />} />
          </Routes>
        </div>
      </SessionProvider>
    </>
  );
}

export default App;
