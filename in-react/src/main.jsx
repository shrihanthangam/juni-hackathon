import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Week1 from "./pages/week1/Week1";
import Tiktok from "./pages/week1/tiktok/Tiktok";
import Youtube from "./pages/week1/youtube/Youtube";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "week1",
    element: <Week1 />,
  },
  {
    path: "week1/tiktok",
    element: <Tiktok />,
  },
  {
    path: "week1/youtube",
    element: <Youtube />,
  },
  {
    path: "week1/work",
    element: <Tiktok />,
  },
  {
    path: "week1/sleep",
    element: <Tiktok />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
