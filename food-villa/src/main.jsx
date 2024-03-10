import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./routes/home";
import Error from "./routes/error.jsx";
import RestaurantMenu from "./routes/restaurantMenu";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const About = lazy(() => import("./routes/about.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/restaurants/:path",
        element: <RestaurantMenu />,
      },
      {
        path: "/about",
        element: (
          <Suspense
            fallback={
              <h1 className="container mx-auto text-center">Loading....</h1>
            }
          >
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
