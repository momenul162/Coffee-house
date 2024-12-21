import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { StoreProvider } from "easy-peasy";
import store from "./store/store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <StoreProvider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StoreProvider>
  /* </React.StrictMode> */
);
