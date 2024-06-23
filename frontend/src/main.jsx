import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";

// Week 1
import Week1 from "./pages/week1/Week1";
import Tiktok from "./pages/week1/tiktok/Tiktok";
import TiktokP from "./pages/week1/tiktok/TiktokP";
import Youtube from "./pages/week1/youtube/Youtube";
import Sleep from "./pages/week1/sleep/Sleep";
import Work from "./pages/week1/work/Work";

// Week 2
import Week2 from "./pages/week2/Week2";
import Park from "./pages/week2/park/Park";

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
    path: "week1/p-tiktok",
    element: <TiktokP />,
  },
  {
    path: "week1/youtube",
    element: <Youtube />,
  },
  {
    path: "week1/work",
    element: <Work />,
  },
  {
    path: "week1/sleep",
    element: <Sleep />,
  },
  {
    path: "week2/",
    element: <Week2 />,
  },
  {
    path: "week2/park",
    element: <Park />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
