import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContextProvider";

export default function SignIn() {
  const { userDispatch } = useContext(userContext);

  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;

    setDetail({
      ...detail,
      [name]: value,
    });
  };

  const handelSignIn = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_API_URI}/loginUser`,
      {
        email: detail?.email,
        password: detail?.password,
      }
    );

    if (response.status === 200) {
      console.log("signIn ");
      console.log("response of login", response.data?.exist[0]);
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userId",response.data?.exist[0]?._id)

      setDetail({ name: "", email: "", password: "" });
      userDispatch({
        type: "SETUSER",
        payload: {
          name: response.data?.exist[0]?.name,
          email: response.data?.exist[0]?.email,
          id: response.data?.exist[0]?._id,
          token: response?.data?.token,
        },
      });
      navigate("/");
    } else {
      console.log("error in signIn");
    }
  };
  return (
    <>
      <form
        onSubmit={handelSignIn}
        className="flex flex-col items-start justify-center w-full h-full"
      >
        <div className="w-full flex h-full items-center justify-center flex-col">
          <input
            type="email"
            placeholder="email"
            name="email"
            value={detail.email}
            required
            onChange={handelChange}
            className="w-[80%] text-center m-2 focus:outline-none shadow-md"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={detail.password}
            required
            onChange={handelChange}
            className="w-[80%] text-center m-2 focus:outline-none shadow-md"
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <button type="submit" className="bg-black rounded-md p-2 text-white">
            SignIn
          </button>
        </div>
      </form>
    </>
  );
}
