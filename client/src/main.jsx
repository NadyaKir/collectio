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
import ProtectedRoutes from "./routes/protectedRoutes.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CollectionsPage from "./pages/CollectionsPage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import AddCollectionPage from "./pages/AddCollectionPage.jsx";
import CollectionItemPage from "./pages/CollectionItemPage.jsx";
import UpdateCollectionPage from "./pages/UpdateCollectionPage.jsx";
import UpdateItemPage from "./pages/UpdateItemPage.jsx";
import AddItemPage from "./pages/AddItemPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import IssuesPage from "./pages/IssuesPage.jsx";

const appRoutes = (
  <Route path="/" element={<App />}>
    <Route path="/" element={<HomePage />} />
    <Route element={<ProtectedRoutes requireAdmin={true} />}>
      <Route path="/users" element={<AdminPage />} />
    </Route>
    <Route element={<ProtectedRoutes />}>
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/issues" element={<IssuesPage />} />
    </Route>
    <Route path="/collections/add" element={<AddCollectionPage />} />
    <Route
      path="/collections/update/:collectionId"
      element={<UpdateCollectionPage />}
    />
    <Route
      path="/collections/:collectionId/items"
      element={<CollectionPage />}
    />
    <Route
      path="/collections/:collectionId/items/:itemId"
      element={<CollectionItemPage />}
    />
    <Route
      path="/collections/:collectionId/items/addItem"
      element={<AddItemPage />}
    />
    <Route
      path="/collections/:collectionId/items/update/:itemId"
      element={<UpdateItemPage />}
    />
    <Route path="/search" element={<SearchPage />} />
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
