import React from "react";
import * as ReactDOM from "react-dom/client";
import "./scss/app.scss"; // Import the main stylesheet
import App from "./App.tsx"; // Import the main component
import Cart from "./pages/Cart.tsx"; // Import the main component
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import the router
import NotFound from "./pages/NotFound.tsx";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import FullPizza from "./pages/FullPizza.tsx";

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

const rootElem = document.getElementById("root");
// Render the app to the root element with the router
if (rootElem) {
  ReactDOM.createRoot(rootElem).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
