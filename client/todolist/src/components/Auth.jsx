import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Auth() {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [toggle, setToggle] = useState(false);

  const toggleForm = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="flex w-full h-[100vh] bg-black  items-center justify-center">
        <div className="flex w-[60%] h-[50%] bg-white">
          <div className="w-1/2 h-full md:flex bg-pink-300 ">    </div>
          <div className="w-1/2 h-full flex items-center justify-center flex-col">
            <div className="flex  cursor-pointer hover:text-red-500 items-center  justify-center">
              {toggle ? (
                <h1  className="ml-2 mb-2"  onClick={toggleForm}> already a member</h1>
              ) : (
                <h1 className="ml-2" onClick={toggleForm}> create a account</h1>
              )}
            </div>

            <div className="flex  items-center flex-col  justify-between h-1/2 w-full">
              {toggle ? (
                <SignUp toggleForm={toggleForm}></SignUp>
              ) : (
                <SignIn toggleForm={toggleForm}></SignIn>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
