import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from "./Components/Home"
import { Login } from "./Components/Login"
import { TodoCreate } from "./Components/TodoCreate";
import { TodoEdit } from "./Components/TodoEdit";
import { PrivateRoute } from './Components/PrivateRoute';
import { Register } from './Components/Registration';
import {useSelector} from 'react-redux';
import { Navbar } from './Components/Navbar';

function App() {
  const {isauthenticated} = useSelector((state) => state.login); 
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={
          
          <PrivateRoute isauthenticated={isauthenticated}>
            <Home /> 
         </PrivateRoute> 
         }></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Register/>}></Route>
        <Route path="/todos-create" element={
          <PrivateRoute isauthenticated={isauthenticated}>
            <TodoCreate />
          </PrivateRoute>
         }></Route>
        
        <Route path="/todos/:id/edit" element={
          <PrivateRoute isauthenticated={isauthenticated}>
            <TodoEdit />
          </PrivateRoute>
         }></Route>
      </Routes>
    </div>
  );
}

export default App;
