import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { TodoContext } from "../context/TodoContextProvider";
import { categoryContext } from "../context/CategoryContextProvider";
import Box from "../components/Box";
import Profile from "../components/Profile";
import Modal from "../components/Modal";
import Card from "../components/Card";

export default function Todo() {
  const { state, getAllTodo } = useContext(TodoContext);
  const { state: CategoryState, getUserCategory } = useContext(categoryContext);
  // getUSerCategory
  useEffect(() => {
    getAllTodo();
    getUserCategory();
  }, []);

  const [text, setText] = useState("");

  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState(false);

  const handelCreateCategoery = () => {
    setOpen(true);
    setCategory(true);
  };

  const handelCreateTodoModal = () => {
    setOpen(true);
    setCategory(false);
  };

  const [showSpecific, setShowSpecific] = useState(false);

  useEffect(() => {
    if (state?.specificCategoryTodo.length > 0) {
      setShowSpecific(true);
    }
  }, [state?.specificCategoryTodo]);

  return (
    <>
      <div className="bg-gradient-to-r from-purple-900 via-pink-600 via-pink-400 to-white h-full w-full">
        <Profile />
      </div>

      {open && (
        <Modal
          onClose={setOpen}
          content={text}
          onTextChange={setText}
          onCategory={category}
        />
      )}

      {/* display all category */}
      <div className="flex flex-wrap items-center justify-center w-full h-full">
        {CategoryState?.categories?.map((item) => {
          return (
            <Box show={false} key={item?.id} id={item?.id} name={item?.name} />
          );
        })}

        <button
          className="flex bg-green-500 text-black p-2 m-2 rounded-full"
          onClick={() => {
            setShowSpecific(false);
          }}
        >
          All
        </button>
      </div>

      <div className="h-full w-full flex items-center justify-center flex-col md:flex-row  ">
        <div className="w-full md:w-1/3 h-full   flex items-center justify-center flex-col border-b-2 md:border-r-2 md:border-b-0  ">
          <button
            onClick={handelCreateCategoery}
            className="bg-black text-white rounded-md p-2 m-2"
          >
            Create Category
          </button>
          <button
            onClick={handelCreateTodoModal}
            className="bg-black text-white rounded-md p-2 m-2"
          >
            Create Todo
          </button>
        </div>

        <div className="h-full w-3/4 p-2 flex items-center justify-center">
          <div className=" p-2 m-2 flex flex-col items-center justify-center w-full h-full ">
            {!showSpecific &&
              state?.todos?.map((item) => {
                return (
                  <>
                    <div
                      key={item._id}
                      className=" flex items-center justify-center w-full h-full border-x-2 "
                    >
                      <Card TODO={item?.content} ID={item?._id}></Card>
                    </div>
                  </>
                );
              })}

              {!showSpecific &&
              state?.todos?.length<1 &&
              <div className="w-full h-full flex items-center justify-center">

                <Box id={0}  name={"No TODO Found"} show={false} />
              </div>
              }
            {showSpecific &&
              state?.specificCategoryTodo?.map((item) => {
                return (
                  <>
                    <div
                      key={item._id}
                      className=" flex items-center justify-center w-full h-full border-x-2 "
                    >
                      <Card TODO={item?.content} ID={item?._id}></Card>
                    </div>
                  </>
                );
              })}
              {
                showSpecific &&
                state?.specificCategoryTodo.length<1 && (
                  <div className="w-full h-full flex items-center justify-center">

                <Box id={0}  name={"No TODO Found"} show={false} />
              </div>
                )
              }
          </div>
        </div>
      </div>
    </>
  );
}
