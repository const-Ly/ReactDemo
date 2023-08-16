import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (token) {
    if (location.pathname == "/login") {
      return <Navigate to="/" replace state={{ from: location }}></Navigate>;
    }
    return children;
  } else {
    return <Navigate to="/login" replace state={{ from: location }}></Navigate>;
  }
};
export default AuthRoute;
