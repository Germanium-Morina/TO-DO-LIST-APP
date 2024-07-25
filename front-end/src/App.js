import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login'
import List from './Components/Table/List'
import Logout from './Components/Auth/Logout'
import { MDBIcon } from 'mdb-react-ui-kit';

function App() {
  return (
    <Router>
      <div className="flex h-screen w-full flex-col bg-gray-200 pr-7 pl-7 text-gray-500">

        <nav className='flex items-end justify-end p-3 text-center pl-6 pr-6 bg-white  mt-3 rounded-lg'>
          <ul className='flex justify-between items-center h-full p-0 m-0 w-full'>
            <li className='flex justify-center items-center'>
              <h1 className='p-0 m-0 flex items-center justify-center text-xl font-bold'>
                TO-DO LIST
              </h1>
            </li>
            <li><Link to="/logout" className='text-gray-500 flex flex-row gap-2 justify-center items-center'>
              <MDBIcon fas icon="sign-out-alt" />
              Logout</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/list" element={<List />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
