import React, { lazy, Suspense } from "react";
import * as ReactDOM from "react-dom/client";
import "./scss/app.scss"; // Import the main stylesheet
import App from "./App.tsx"; // Import the main component
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import the router

import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";

const Cart = lazy(
  () => import(/*webpackChunkName : "Cart"*/ "./pages/Cart.tsx")
);
const FullPizza = lazy(
  () => import(/*webpackChunkName : 'FullPizza'*/ "./pages/FullPizza.tsx")
);
const NotFound = lazy(
  () => import(/*webpackChunkName : 'NotFound'*/ "./pages/NotFound.tsx")
);

// Create a router object with a single route
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <NotFound />,
  },

  {
    path: "/cart",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
    ),
    errorElement: <NotFound />,
  },

  {
    path: "/pizza/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <FullPizza />
      </Suspense>
    ),

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
