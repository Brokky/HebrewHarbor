import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Home from "./pages/Home/Home";
import Dictionary from "./pages/Dictionary/Dictionary";
import Lesson from "./pages/Lesson/Lesson";
import "./main.scss";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dictionary",
    element: <Dictionary />,
  },
  {
    path: "/lesson",
    element: <Lesson />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
