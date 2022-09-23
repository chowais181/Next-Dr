import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute(props) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to="/home" />;
  } else {
    //if login then go to home other wise go to the mentioned route
    return props.children;
  }
}

export default PublicRoute;
