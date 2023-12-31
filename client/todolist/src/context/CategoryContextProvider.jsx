import React, { createContext, useReducer } from "react";
import axios from "axios";

import { CategoryReducer } from "../reducers/CategoryReducer";

export const categoryContext = createContext(null);

export default function CategoryContextProvider({ children }) {
  const initalCategory = {
    categories: [],
    allinfo: "",
  };

  const [state, CategoryDispatch] = useReducer(CategoryReducer, initalCategory);

  const createCategory = async (content) => {
    
    const response = await axios.post(
      `${process.env.REACT_APP_API_URI}/createCategory`,
      { name:content },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("userId"),
        },
      }
    );

    if (response.status === 200) {
      alert("category created")
      getUserCategory();
    }
  };

  const getUserCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/getUserCategories`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: localStorage.getItem("userId"),
          },
        }
      );

      if (response.status === 200) {
       
        CategoryDispatch({
          type: "SETCATEGORY",
          payload: response?.data?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const deleteCategory=async(categoryId)=>{
    try {

      const response=await axios.delete(
        `${process.env.REACT_APP_API_URI}/deleteCategory/${categoryId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: localStorage.getItem("userId"),
          },
        }
      );

      if (response.status === 200) {
        alert("category deletd")
      getUserCategory()
      
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <categoryContext.Provider
        value={{ state, CategoryDispatch, createCategory, getUserCategory,deleteCategory }}
      >
        {children}
      </categoryContext.Provider>
    </>
  );
}
