import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import "./scss/_app.scss";
import App from "./App";
import { BoardContextProvider } from "./context/BoardContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <BoardContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BoardContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
