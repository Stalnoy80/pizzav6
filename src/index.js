import React from "react";
import * as ReactDOM from "react-dom/client";
import "./scss/app.scss"; // Import the main stylesheet
import App from "./App"; // Import the main component
import Cart from "./pages/Cart"; // Import the main component
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import the router
import NotFound from "./pages/NotFound";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import FullPizza from "./pages/FullPizza";

// Create a router object with a single route

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <NotFound />,
  },

  {
    path: "/cart",
    element: <Cart />,
    errorElement: <NotFound />,
  },

  {
    path: "/pizza/:id",
    element: <FullPizza />,
    errorElement: <NotFound />,
  },
]);

// Render the app to the root element with the router
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
