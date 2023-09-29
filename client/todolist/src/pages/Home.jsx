import React, { useContext, useEffect, useState } from "react";
import Auth from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContextProvider";
import Todo from "./Todo"

export default function Home() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  const { state } = useContext(userContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  return (
    <>
     
     

      {!token ? <Auth /> : <>
      <Todo/>
      
      </>}
    </>
  );
}
