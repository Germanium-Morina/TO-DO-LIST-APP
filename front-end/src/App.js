import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import TaskTable from "./Components/Table/TaskTable";
import Logout from "./Components/Auth/Logout";
import { MDBIcon } from "mdb-react-ui-kit";

function App() {
  return (
    <Router>
      <div className="flex w-full h-full flex-col bg-gray-200 text-gray-500">
        <nav className="flex items-end justify-end p-3 text-center pl-6 pr-6 bg-white mobile:mr-7 mobile:ml-7 mr-3 ml-3  mt-3 rounded-lg shadow-gray-200 shadow-md">
          <ul className="flex justify-between items-center h-full p-0 m-0 w-full">
            <li className="flex justify-center items-center">
              <h1 className="p-0 m-0 flex items-center justify-center text-xl font-bold">
                TO-DO LIST
              </h1>
            </li>
            <li>
              <Link
                to="/logout"
                className="text-gray-500 flex flex-row gap-2 justify-center items-center">
                <MDBIcon fas icon="sign-out-alt" />
                Logout
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/taskTable" element={<TaskTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
