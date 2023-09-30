import React from "react";
import { useContext } from "react";
import { categoryContext } from "../context/CategoryContextProvider";
import { TodoContext } from "../context/TodoContextProvider";
export default function Box({ id, name, show }) {
  const { state, deleteCategory } = useContext(categoryContext);
  const { state: TodoState, getSpecificCategoryTodo } = useContext(TodoContext);

  return (
    <>
      <div
        className="flex items-center justify-center m-2"
        onClick={() => {
          console.log("id of cat", id);
          getSpecificCategoryTodo(id);
        }}
      >
        <h2 className="flex  items-center text-center p-2 m-2 bg-blue-950 text-white rounded-xl cursor-pointer ">
          {name}
        </h2>
        {show && (
          <button
            className="flex bg-red-500 text-black p-2 m-2 rounded-full"
            onClick={() => {
              deleteCategory(id);
            }}
          >
            x
          </button>
        )}
      </div>
    </>
  );
}
