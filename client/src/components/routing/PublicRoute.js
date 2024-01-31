import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../features/user/userActions";

function PublicRoute(props) {
  const dispatch = useDispatch();
  const { userInfo, isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details if the user is logged in
    if (isLogin && !userInfo) {
      dispatch(getUserDetails());
    }
  }, [dispatch, isLogin, userInfo]);

  // Assuming userRole is not stored in Redux state
  // If userRole is also in Redux state, you can use it in the condition

  if (isLogin) {
    return <Navigate to="/home" />;
  }

  // If the user is not logged in, allow access to the public route
  return props.children;
}

export default PublicRoute;
