import React from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CollectionsPage from "./pages/CollectionsPage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";

const appRoutes = (
  <Route path="/" element={<App />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/users" element={<AdminPage />} />
    <Route path="/collections" element={<CollectionsPage />} />
    <Route path="/collections/collection/:id" element={<CollectionPage />} />
  </Route>
);

const authRoutes = (
  <>
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
  </>
);

const routes = createRoutesFromChildren([appRoutes, authRoutes]);
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
