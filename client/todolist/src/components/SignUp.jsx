import axios from "axios";
import React from "react";
import { useState } from "react";

export default function SignUp(props) {
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

  const handelSignUp = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_API_URI}/createUser`,
      {
        name: detail?.name,
        email: detail?.email,
        password: detail?.password,
      }
    );

    if (response.status === 200) {
      console.log("signUP ");
      console.log("response of login", response);
      setDetail({ name: "", email: "", password: "" });
      props.toggleForm();
    } else {
      console.log("error in signUp");
    }
  };

  return (
    <>
      <form
        onSubmit={handelSignUp}
        className="flex flex-col items-start justify-center w-full h-full"
      >
        <div className="w-full flex h-full items-center justify-center flex-col">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={detail.name}
            required
            onChange={handelChange}
            className="w-[80%] text-center m-2 focus:outline-none shadow-md"
          />
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
            SignUp
          </button>
        </div>
      </form>
    </>
  );
}
