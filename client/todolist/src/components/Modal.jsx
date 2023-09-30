import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContextProvider";
import { categoryContext } from "../context/CategoryContextProvider";
import Box from "./Box";

export default function Modal({ onClose, onTextChange, content, onCategory }) {
  const { state, getAllTodo, deleteTodo, updateTodo, createTodo } =
    useContext(TodoContext);

  const [text, setText] = useState("");
  const {
    state: categoryState,
    CategoryDispatch,
    createCategory,
  } = useContext(categoryContext);

  const [catId, setCatId] = useState("");

  const handelModalCreate = async () => {
    if (onCategory) {
      createCategory(text);
      setText("")
    } else {
      try {
        if (categoryState?.categories.length < 2) {
          setCatId(categoryState?.categories[0]?.id);
        }

        await createTodo(text, catId);
        setText("")
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full h-full flex shadow-2xl rounded-lg items-center justify-center flex-col">
        <div className="w-full flex  items-end justify-end mr-10">
          <button
            className="bg-black text-red-500 text-center rounded-md  m-3 w-[45px] h-[30px]"
            onClick={() => onClose(false)}
          >
            x
          </button>
        </div>

        <div className="w-full h-full flex items-center justify-center flex-col">
          <div className="flex h-full w-full items-center flex-col justify-center">
            {onCategory && (
              <div className="flex h-full w-full flex-col  items-center justify-center">
                <h1 className="text-2xl">Categories</h1>
              </div>
            )}

            <div className="flex h-full w-full   items-center justify-center m-2 flex-wrap">
              {onCategory &&
                categoryState?.categories?.map((item) => {
                  return (
                    <Box
                      show={true}
                      key={item?.id}
                      id={item?.id}
                      name={item?.name}
                    />
                  );
                })}

              {onCategory && categoryState?.categories?.length < 1 && (
                <div className="w-full h-full flex items-center justify-center">
                  <Box id={0} name={"No Category Found"} show={false} />
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-full flex items-center justify-center">
            {!onCategory &&
              categoryState?.categories &&
              categoryState?.categories.length >= 2 && (
                <>
                  <select
                    name="category"
                    className="w-[50%] h-full rounded-md bg-black text-green-200 text-center m-10"
                    onChange={(e) => {
                      setCatId(e.target.value);
                    }}
                  >
                    {categoryState?.categories.map((item) => (
                      <option
                        key={item?.id}
                        className="w-full h-full m-5 flex"
                        value={item?.id}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
          </div>

          <div className="w-full h-full flex items-center justify-center">
            {!onCategory &&
              categoryState?.categories &&
              categoryState?.categories.length < 2 &&
              categoryState?.categories?.length > 0 && (
                <select
                  name="category"
                  className="w-[50%] h-full rounded-md bg-black text-green-200 text-center m-10"
                >
                  <option
                    key={categoryState?.categories[0]?.id}
                    className="w-full h-full m-5 flex p-4"
                    value={categoryState?.categories[0]?.id}
                  >
                    {categoryState?.categories[0]?.name}
                  </option>
                </select>
              )}

            {!onCategory && categoryState?.categories?.length < 1 && (
              <div className="w-full h-full flex items-center justify-center">
                <Box id={0} name={"No Category Found"} show={false} />
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <input
            type="text"
            name="text"
            value={text}
            required
            className="w-[60%] text-center m-2 focus:outline-none shadow-md"
            placeholder="Text"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="bg-black text-white rounded-md p-1 m-3"
            onClick={handelModalCreate}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
