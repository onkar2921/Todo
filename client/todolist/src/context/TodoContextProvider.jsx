import { createContext, useReducer } from "react";
import axios from "axios";
import { TodoReducer } from "../reducers/TodoReducer";

export const TodoContext = createContext(null);

export default function TodoContextProvider({ children }) {
  const intialTodo = {
    todos: [],
    specificCategoryTodo: [],
  };

  const [state, TodoDispatch] = useReducer(TodoReducer, intialTodo);

  const getAllTodo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}/getAllTodo`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: localStorage.getItem("userId"),
          },
        }
      );
      if (res.status === 200) {
        TodoDispatch({ type: "SETTODOS", payload: res.data.data });
      }
      console.log("failed in gatting todos");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (TodoId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/deleteTodo/${TodoId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: localStorage.getItem("userId"),
          },
        }
      );
      if (res.status === 200) {
        console.log("todo deleted sucessfully");
        
        getAllTodo();
        
      }
      console.log("failed in deleting todo");
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (TodoId, content) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URI}/updateTodo/${TodoId}`,
        { content },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: localStorage.getItem("userId"),
          },
        }
      );
      if (res.status === 200) {
        console.log("todo updated sucessfully");
        getAllTodo();
      }
      console.log("failed in updating  todo");
    } catch (error) {
      console.log(error);
    }
  };

  const createTodo = async (content, category) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/createTodo`,
        { content, category },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: localStorage.getItem("userId"),
          },
        }
      );
      if (res.status === 200) {
        // console.log("todo created sucessfully");
        alert("todo created")
        getAllTodo();
      } else {
        alert("failed in creating  todo")
        // console.log("failed in creating  todo");
      }
    } catch (error) {
      console.log(error);
    }
  };



  const getSpecificCategoryTodo = async (category) => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/getSpecificCategoryTodo/${userId}?`,
        { category }
      );

      if (res.status === 200) {
        // console.log("getting specific category todos", res.data?.data);
        TodoDispatch({ type: "SETSPECIFICTODO", payload: res.data?.data });
        alert("fetched todos")
      } else {
        console.log("failed in creating todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TodoContext.Provider
        value={{
          state,
          TodoDispatch,
          getAllTodo,
          deleteTodo,
          updateTodo,
          createTodo,
          getSpecificCategoryTodo,
        }}
      >
        {children}
      </TodoContext.Provider>
    </>
  );
}
