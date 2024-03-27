import "./index.css";
import App from "./App.jsx";
import Home from "./routes/home";
import React, { lazy, Suspense } from "react";
import Error from "./routes/error.jsx";
import Cart from "./routes/Cart.jsx";
import RestaurantMenu from "./routes/restaurantMenu";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

const About = lazy(() => import("./routes/about.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Provider store={store}>
        <Error />
      </Provider>
    ),
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "restaurants/:path",
        element: <RestaurantMenu />,
      },
      {
        path: "about",
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
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
