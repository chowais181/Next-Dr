import React, { Fragment, useState } from "react";

// import { addAppointment } from "../../actions/appointment";
import { Link } from "react-router-dom";

const Form = ({ profile, doctorId, history, addAppointment }) => {
  const [formData, setFormData] = useState({
    time: "",
    patientName: "",
    fatherName: "",
    age: "",
    date: "",
    description: "",
  });

  const { patientName, fatherName, age, time, date, description } = formData;
console.log(formData)
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  return (
    <Fragment>
      <br />
      <div className="heading-common">
        <h1>
          <strong>Book Appointment</strong>
        </h1>
        <p className="lead">
          Doctor details, book your appointment according to dr's checkup time.
        </p>
        <hr />
        <div className="appointment-doctor">
          <img
            className="round-img appointment-img"
            src={profile?.doctor?.avatar}
            alt=""
          />
        </div>
        <p className="lead">
          <strong>{profile?.doctor?.name}</strong>
        </p>
        <p className="lead">
          <strong>{profile?.specialist}</strong>
        </p>
        <p className="lead">
          <strong>Rs. {profile?.fees}/-</strong>
        </p>
        <p className="lead">
          <strong>Checkup Time:- {profile?.timing}</strong>
        </p>
        <hr />
        <p className="lead">
          Provide your details correctly and book your appointment.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // addAppointment(doctorId, formData, history);
        }}
      >
        <small>* = required field</small>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* Patient name"
            name="patientName"
            value={patientName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* Father name"
            name="fatherName"
            value={fatherName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* Age"
            name="age"
            value={age}
            onChange={(e) => onChange(e)}
          />
        </div>
        <h6>Date</h6>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            name="date"
            value={date}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <h6>Time</h6>
        <div className="form-group">
          <input
            type="time"
            className="form-control"
            name="time"
            value={time}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="* Health Problem Description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us about the Health Problem.</small>
        </div>
        <input type="submit" value="Submit" className="btn btn-info" />{" "}
        <Link to="/home" type="submit" className="btn btn-outline-secondary">
          Go Back
        </Link>
      </form>
      <br />
    </Fragment>
  );
};

export default Form;
