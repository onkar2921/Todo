import React, { createContext, useReducer } from "react";
import { UserReducer } from "../reducers/UserReducer";
import axios from "axios";
export const userContext = createContext(null);

export default function UserContextProvider({ children }) {
  const initialUser = {
    name: "",
    email: "",
    id: "",
    token: "",
    avatar: "",
  };

  const [state, userDispatch] = useReducer(UserReducer, initialUser);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/getUser`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: localStorage.getItem("userId"),
          },
        }
      );

      if (response.status === 200) {
        userDispatch({
          type: "SETUSER",
          payload: {
            name: response.data?.data?.name,
            email: response.data?.data?.email,
            id: response.data?.data?._id,
            avatar: response.data?.data?.avatar,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserAvatar = async (avatar) => {
    try {
      const data = await axios.patch(
        `${process.env.REACT_APP_API_URI}/avatar`,
        { avatar },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: localStorage.getItem("userId"),
          },
        }
      );

      if (data.status === 200) {
        console.log("updated data", data?.data?.userAvatarUpdate?.avatar);

        userDispatch({
          type: "SETUSERAVATAR",
          payload: data?.data?.userAvatarUpdate?.avatar,
        });
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <userContext.Provider
        value={{ state, userDispatch, getUser, updateUserAvatar }}
      >
        {children}
      </userContext.Provider>
    </>
  );
}
