import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import "../App.css";

export default function LandingPage() {
  return (
    <Fragment>
      <section id="landing">
        <div className="container">
          <div className="heading">
            <h1 className="main-heading">Find Your Best Doctor &</h1>
            <h1 className="main-heading">
              Book Your <span className="main-span">Appointment.</span>
            </h1>
          </div>
          <div className="signup">
            <div className="doctor-signup">
              <h2 className=" item heading-sub">
                <strong>Login</strong>
              </h2>
              <p className="item description">
                Welcome back!
                <br />
                We are facilitating both user and doctor. You can book your
                Appointment with best doctors.
              </p>
              <Link to="/login" type="button" className="item btn btn-info">
                Login
              </Link>
            </div>
            <div className="user-signup">
              <h2 className="item heading-sub">
                <strong>Sign Up</strong>
              </h2>
              <p className="item special description">
                Welcome.New User!
                <br />
                Best app for finding your doctor and book Appointment. Automate
                manually booking.
              </p>
              <Link to="/register" className="item btn btn-outline-info">
                Sign up
              </Link>
            </div>
          </div>
          <br />
          <div className="img">
            <div className="img-1">
              <img
                alt="doctor"
                src={require("../imges/landingPage.svg").default}
              />
            </div>
          </div>
        </div>
        <br />
      </section>
    </Fragment>
  );
}
