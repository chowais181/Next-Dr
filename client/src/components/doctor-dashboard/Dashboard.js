import React, { useEffect, Fragment } from "react";
import Experience from "./Experience";
import Education from "./Education";
import Patient from "./Patient";
import Review from "./Review";
import Loader from "../Loader";
import {
  deleteProfile,
  myProfile,
} from "../../features/profile/profileActions";
import { getMyAppointmentsDoctor } from "../../features/appointment/appointmentActions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { loading, profile, isDeleted } = useSelector((state) => state.profile);
  const { appointments } = useSelector((state) => state.appointment);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMyAppointmentsDoctor());
    dispatch(myProfile());
    if (isDeleted) {
      navigate("/");
    }
  }, [dispatch, isDeleted, navigate]);

  return loading && profile === null ? (
    <Loader />
  ) : (
    <Fragment>
      <section id="dashboard">
        <div className="container">
          <div className="heading-common">
            <h1>
              <strong>Dashboard</strong>
            </h1>
            <h2 className="welcome-heading">
              <i className="fas fa-user-md"></i> Welcome {profile?.name}
            </h2>
          </div>
          <br />
          {profile ? (
            <Fragment>
              {appointments !== null && appointments?.length > 0 ? (
                <Patient patient={appointments} />
              ) : (
                <h5 style={{ color: "#738f93" }}>No Appointments yet..</h5>
              )}
              <Review
                patient={appointments && appointments}
                review={profile?.reviews}
              />
              <Experience experience={profile?.experience} />
              <Education education={profile?.education} />
              <button
                onClick={() => dispatch(deleteProfile())}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not any Profile add your Profile..</p>
              <Link to="/apply-doctor" className="btn btn-info">
                Create Profile
              </Link>
            </Fragment>
          )}
        </div>
      </section>
      <br />
    </Fragment>
  );
};

export default DoctorDashboard;
