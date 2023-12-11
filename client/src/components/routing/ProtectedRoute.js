import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../features/user/userActions";
import { myProfile } from "../../features/profile/profileActions";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const { userInfo, isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLogin) {
      if (!userInfo) {
        dispatch(getUserDetails());
      }
      dispatch(myProfile());
    }
  }, [dispatch, userInfo, isLogin]);

  // Show unauthorized screen if no user is found in Redux store
  if (!isLogin) {
    return <Navigate to="/" />;
  } else {
    if (userInfo?.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    }
  }

  // Return the rest of the code here
  return props.children;
};

export default ProtectedRoute;
