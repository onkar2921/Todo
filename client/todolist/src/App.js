
import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Todo from './pages/Todo';
import Auth from './components/Auth';

function App() {
  return (
   <>

   <Routes>


    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/todo' element={<Todo></Todo>}></Route>
    <Route path='/auth' element={<Auth/>}></Route>
  

   </Routes>

  
   
   </>
  );
}

export default App;
