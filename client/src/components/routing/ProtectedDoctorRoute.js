import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../features/user/userActions";
import { myProfile } from "../../features/profile/profileActions";

const ProtectedDoctorRoute = (props) => {
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
  // show unauthorized screen if no user is found in redux store
  if (!isLogin || !userInfo || userInfo?.role !== "doctor") {
    return <Navigate to="/" />;
  }
  // return the rest of the code here
  return props.children;
};

export default ProtectedDoctorRoute;
