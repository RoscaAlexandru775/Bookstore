import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Presentation from "../pages/Presentation/Presentation";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import BooksPage from "../pages/BooksPage/BooksPage";
import RoleAccess from "./roleAccess";
import { USER_ROLE } from "../models/roles";
import ToastContextProvider from "../contexts/toastContext";
import Cart from "../pages/Cart/Cart";

function Router() {
  return (
    <BrowserRouter>
      <ToastContextProvider>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Presentation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          {/* user routes */}
          <Route element={<RoleAccess roles={[USER_ROLE]} />}>
            <Route path="/book/:id" element={<DetailsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* custom 404 */}
          <Route path="/404" element={<div>404</div>} />
          {/* catch any and redirect to 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </ToastContextProvider>
    </BrowserRouter>
  );
}

export default Router;
