import React from 'react'

import { useContext,useState } from 'react';
import { TodoContext } from '../context/TodoContextProvider';
export default function Card({TODO,ID}) {

  const { state, getAllTodo, deleteTodo, updateTodo, createTodo } =
useContext(TodoContext);


const [updateText, setUpdateText] = useState("");

const handelUpdate = async (TodoId, content) => {
  await updateTodo(TodoId, content);
};

  const handelDelete = async (TodoId) => {
    console.log("todoids", TodoId);
    await deleteTodo(TodoId);
  };
  return (
   <>
   <div className='flex w-full h-full  md:flex-col p-2 ml-2'>

<div className=' flex  items-center justify-around text-center shadow-xl p-2 flex-col   md:flex-row'>

  <h1>{TODO}</h1>

  <button  className="bg-black text-red-500 rounded-md p-2 m-3" onClick={() => handelDelete(ID)}>delete</button>

  <input
                  type="text"
                  name="content"
                  value={updateText}
                  required
                  placeholder="TODO UPDATE"
                  className="w-[40%]  text-center m-2 focus:outline-none shadow-md"
                  onChange={(e) => {
                    setUpdateText(e.target.value);
                  }}
                  />




      <button className="bg-black text-white rounded-md p-2 m-3" onClick={() => handelUpdate(ID, updateText)}>
                  update
                </button>  
                      
                  </div>

   </div>
   
    
    
   </>
  )
}
