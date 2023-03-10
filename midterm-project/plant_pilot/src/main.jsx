import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Plant from "./Plant";
import Credits from "./Credits";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search/:query",
    element: <Search />,
  },
  {
    path: "/plant/:id",
    element: <Plant />,
  },
  {
    path: "/credits",
    element: <Credits />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
