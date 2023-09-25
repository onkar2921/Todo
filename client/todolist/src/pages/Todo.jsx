import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TodoContext } from "../context/TodoContextProvider";
import { useContext } from "react";
export default function Todo() {
  const { state, getAllTodo,deleteTodo ,updateTodo,createTodo} = useContext(TodoContext);

  useEffect(() => {
    getAllTodo();
  }, []);




  const handelDelete=async(TodoId)=>{
console.log("todoids",TodoId)
    await deleteTodo(TodoId)

  }


  const handelUpdate=async(TodoId,content)=>{

        await updateTodo(TodoId,content)

  }

  const [text,setText]=useState("")
  const [updateText,setUpdateText]=useState("")


  const handelCreateTodo=async(content)=>{
    try {

        await createTodo(content)    
        
    } catch (error) {
        console.log(error)
    }
  }

//   console.log("state of todos", state?.todos);
  return (
    <>
      <div>Todo</div>

      <input type="text" name="content"  value={text} required placeholder="TODO" onChange={(e)=>{setText(e.target.value)}} />

      <button onClick={()=>handelCreateTodo(text)}>Send</button>

      <div>

           {
             state?.todos?.map((item)=>{
                return <>
                <div key={item.id}>

                <h1>{item?.content}</h1>
              
                <button onClick={()=>handelDelete(item?._id)}>delete</button>
                <input type="text" name="content"  value={updateText} required placeholder="TODO UPDATE" onChange={(e)=>{setUpdateText(e.target.value)}} />

                <button onClick={()=>handelUpdate(item?._id,updateText)}>update</button>
                </div>
                
                </>
                
            })
           }

      </div>
    </>
  );
}
