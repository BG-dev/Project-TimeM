import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./scss/_app.scss";
import App from "./App";
import { BoardContextProvider } from "./context/BoardContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BoardContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BoardContextProvider>
  </Provider>
  // </React.StrictMode>
);
