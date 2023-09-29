import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { userContext } from "../context/UserContextProvider";
export default function Profile() {
  const { state, getUser } = useContext(userContext);
  useEffect(() => {
    getUser();
  }, []);


  const [avatar,setAvatar]=useState("")
  if(avatar){
    // console.log("avatart-------",avatar)
  }

  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-full w-full items-center justify-center flex-col ">
        <div className="flex w-full h-full items-center justify-between flex-col">
          <img
            src=""
            alt="user"
            className="bg-red-100 h-[200px] w-[200px] rounded-full mt-10"
          />
          <h1 className="m-4">{state?.name}</h1>
          {/* <input type="file" name="avatar" value={avatar} required onChange={(e)=>{setAvatar(e.target.files[0])}} /> */}
         
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            alert("logout");
            console.log("logout");
            navigate("/auth");
          }}
          className="bg-black rounded-md p-2 text-white mb-4"
        >
          logout
        </button>
      </div>
    </>
  );
}
