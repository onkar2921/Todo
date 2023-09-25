
import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Todo from './pages/Todo';

function App() {
  return (
   <>

   <Routes>


    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/todo' element={<Todo></Todo>}></Route>



   </Routes>

  
   
   </>
  );
}

export default App;
