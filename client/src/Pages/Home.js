import { Fragment } from "react";
import Profiles from "./profiles/Profiles";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myProfile } from "../features/profile/profileActions";
import { Navigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

  if (userInfo?.role === "admin") {
    return <Navigate to="/admin-dashboard" />;
  }

  return (
    <Fragment>
      <section id="dashboard">
        <div className="container">
          <Profiles />
        </div>
      </section>
    </Fragment>
  );
}
