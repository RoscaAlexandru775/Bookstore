import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IRoleProps } from "../models/roles";
import { parseJWTPayload } from "../utils/auth";

function RoleAccess({ roles }: IRoleProps) {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    // user not authenticated
    return <Navigate to="/" replace />;
  }

  const userInfo = parseJWTPayload(authToken);
  const hasAccess: boolean = roles.includes(userInfo.role);

  return hasAccess ? <Outlet /> : <Navigate to="/" replace />;
}

export default RoleAccess;
