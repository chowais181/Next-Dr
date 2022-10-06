import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute(props) {
  const { userInfo } = useSelector((state) => state.user);
  if (localStorage.getItem("userToken")) {
    if (userInfo && userInfo?.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/home" />;
    }
  } else {
    //if login then go to home other wise go to the mentioned route
    return props.children;
  }
}

export default PublicRoute;
