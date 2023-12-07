import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute(props) {
  const isLogin = useSelector((state) => state.user.isLogin);

  if (isLogin) {
    // Assuming userRole is not stored in Redux state
    // If userRole is also in Redux state, you can use it in the condition
    if (localStorage.getItem("userRole") === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  return props.children;
}

export default PublicRoute;
