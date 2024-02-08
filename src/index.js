import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import AdministratorPortal from "./pages/AdministratorPortal/AministratorPortal";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { store } from "./store/configureStore";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/administrator-portal" element={<AdministratorPortal />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
