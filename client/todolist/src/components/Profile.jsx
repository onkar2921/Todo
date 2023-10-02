import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { userContext } from "../context/UserContextProvider";
export default function Profile() {
  const { state, getUser ,updateUserAvatar} = useContext(userContext);
  useEffect(() => {
    getUser();
  }, []);


  const [avatar,setAvatar]=useState(null)
 


  const uploadImage=async(avatar)=>{
    try {

     
      
      const cloudname = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
      const uploadPreset = "todolist"; // Replace with your Cloudinary upload preset
      
      const formData = new FormData();
      formData.append("file", avatar);
      
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            upload_preset: uploadPreset,
            api_key: apiKey, // Include the API key in the request
          },
        }
      );
      
     

      const updateAvatar=await updateUserAvatar(response.data.url)
      if(updateAvatar){
        alert("profile photo updated")
        setAvatar(null)
      }

      
      
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-full w-full items-center justify-center flex-col ">
        <div className="flex w-full h-full items-center justify-between flex-col">
          <img
            src={state?.avatar}
            alt="user"
            className="bg-red-100 h-[200px] w-[200px] rounded-full mt-10"
          />
          <h1 className="m-4">{state?.name}</h1>

          <div className="flex w-1/2 m-4 items-center justify-center ">

          <input type="file"  name="avatar"  className=" rounded-full p-2" required onChange={(e)=>{
            setAvatar(e.target.files[0])
            
          }} />
         <button className="bg-black  text-white rounded-md p-2 m-2 " onClick={()=>uploadImage(avatar)}>Upload</button>
          </div>
        </div>


        <button
          onClick={() => {
            localStorage.removeItem("token");
            alert("logout");
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
