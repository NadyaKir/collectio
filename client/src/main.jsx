import React from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CollectionsPage from "./pages/CollectionsPage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/collections/collection/:id" element={<CollectionPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
