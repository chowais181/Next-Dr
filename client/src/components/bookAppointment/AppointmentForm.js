import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProfile } from "../../features/profile/profileActions";
import Form from "./Form";
import { useParams } from "react-router-dom";

const AppointmentForm = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, profile } = useSelector((state) => state.profile);
  if (loading === false) {
    console.log(profile);
  }
  useEffect(() => {
    dispatch(getSingleProfile(id));
  }, [id, dispatch]);

  return (
    <Fragment>
      <section id="Login">
        <div className="container">
          <div className="common-form">
            <div className="form-side">
              {profile !== null ? (
                <Form profile={profile} doctorId={profile.doctor._id} />
              ) : (
                ""
              )}
            </div>
            <div className="img-side">
              <img
                src={process.env.PUBLIC_URL + "imges/calendar.svg".default}
                alt=""
                className="register-user"
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AppointmentForm;
