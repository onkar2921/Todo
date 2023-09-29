import { createContext, useReducer } from "react";
import axios from "axios";
import { TodoReducer } from "../reducers/TodoReducer";

export const TodoContext=createContext(null)

export default function TodoContextProvider({children}) {

  const intialTodo={
    todos:[]

  }

  const [state, TodoDispatch] = useReducer(TodoReducer,intialTodo);

  const getAllTodo=async()=>{
    try {
      // console.log("for uri",process.env.REACT_APP_API_URI)
      const res=await axios.get(`${process.env.REACT_APP_API_URI}/getAllTodo`,{
        headers:{
          authorization: `Bearer ${localStorage.getItem("token")}`,
          userId:localStorage.getItem("userId")
        }
      })
      if(res.status===200){
        TodoDispatch({type:"SETTODOS",payload:res.data.data})
      }
      console.log("failed in gatting todos")
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo=async(TodoId)=>{
  try {

    const res=await axios.delete(`${process.env.REACT_APP_API_URI}/deleteTodo/${TodoId}`,{
      headers:{
        authorization: `Bearer ${localStorage.getItem("token")}`,
        userId:localStorage.getItem("userId")
      }
    })
    if(res.status===200){
      console.log("todo deleted sucessfully")
      getAllTodo()
    }
    console.log("failed in deleting todo")
    
  } catch (error) {
    console.log(error)
  }
  }

  const updateTodo=async(TodoId,content)=>{
    try {
  
      const res=await axios.patch(`${process.env.REACT_APP_API_URI}/updateTodo/${TodoId}`,{content},{
        headers:{
          authorization: `Bearer ${localStorage.getItem("token")}`,
          userId:localStorage.getItem("userId")
        }
      })
      if(res.status===200){
        console.log("todo updated sucessfully")
        getAllTodo()
      }
      console.log("failed in updating  todo")
      
    } catch (error) {
      console.log(error)
    }
    }

    const createTodo=async(content,category)=>{
      try {
    
        const res=await axios.post(`${process.env.REACT_APP_API_URI}/createTodo`,{content,category},{
          headers:{
            authorization: `Bearer ${localStorage.getItem("token")}`,
            userId:localStorage.getItem("userId")
          }
        })
        if(res.status===200){
          console.log("todo created sucessfully")
          getAllTodo()
        }
        console.log("failed in creating  todo")
        
      } catch (error) {
        console.log(error)
      }
      }



  return (
    <>
    <TodoContext.Provider value={{state,TodoDispatch,getAllTodo,deleteTodo,updateTodo,createTodo}} >
    {children}
    </TodoContext.Provider>
    
    
    </>
  )
}
