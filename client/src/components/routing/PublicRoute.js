import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../features/user/userActions";

function PublicRoute(props) {
  const dispatch = useDispatch();
  const { userInfo, isLogin } = useSelector((state) => state.user);

  if (isLogin) {
    if (!userInfo) {
      dispatch(getUserDetails());
    }
    // Assuming userRole is not stored in Redux state
    // If userRole is also in Redux state, you can use it in the condition

    if (userInfo?.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  return props.children;
}

export default PublicRoute;
