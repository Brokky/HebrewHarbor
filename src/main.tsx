import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home"
import Dictionary from "./pages/Dictiionary/Dictionary";
import Lesson from "./pages/Lesson/Lesson";
import './main.scss';

const router = createBrowserRouter([
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
