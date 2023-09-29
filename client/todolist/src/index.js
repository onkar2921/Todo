import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import TodoContextProvider from "./context/TodoContextProvider";
import UserContextProvider from "./context/UserContextProvider";
import CategoryContextProvider from "./context/CategoryContextProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <TodoContextProvider>
        <CategoryContextProvider>
          <App />
        </CategoryContextProvider>
        </TodoContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
