import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { Users } from "./components/Users";
import { Maps } from "./components/Maps";
import { Trails } from "./components/Trails";
import { TrailMaps } from "./components/TrailMaps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/maps",
    element: <Maps />,
  },
  {
    path: "/trails",
    element: <Trails />,
  },
  {
    path: "/trailmaps",
    element: <TrailMaps />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Analytics />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
