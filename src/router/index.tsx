import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<div>Presentation Page</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        {/* custom 404 */}
        <Route path="/404" element={<div>404</div>} />
        {/* catch any and redirect to 404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
