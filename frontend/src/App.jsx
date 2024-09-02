import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Routes, Route } from 'react-router-dom';

// Pages
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Storage } from './pages/Storage'
import { AdminPanel } from './pages/AdminPanel'

// Components
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div className='content'>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/signin' Component={SignIn} />
          <Route path='/storage' Component={Storage} />
          <Route path='/admin' Component={AdminPanel} />
        </Routes>
      </div>

      <div className="">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
