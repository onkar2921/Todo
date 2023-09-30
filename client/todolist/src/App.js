
import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Todo from './pages/Todo';
import Auth from './components/Auth';
import { useNavigate } from 'react-router-dom';
import { useContext ,useState,useEffect} from 'react';
import { userContext } from './context/UserContextProvider';
function App() {

  const navigate = useNavigate();

  const [token, setToken] = useState("");

  const { state } = useContext(userContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);


  return (
   <>

   <Routes>


    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/todo" element={token?<Todo></Todo>:<Auth/>}></Route>
    <Route path="/auth" element={<Auth/>}></Route>
  

   </Routes>

  
   
   </>
  );
}

export default App;
