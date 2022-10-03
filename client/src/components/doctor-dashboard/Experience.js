import React, { Fragment } from "react";
import Moment from "react-moment";

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.institute}</td>
      <td>{exp.position}</td>
      <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <div className="common-details">
        <h2 className="credentials">
          <strong>Experience Credentials</strong>
        </h2>
        <br />
        <div className="common-table">
          <table className="table">
            <tr>
              <th>Hospital</th>
              <th>Position</th>
              <th>Years</th>
              <th></th>
            </tr>
            {experiences}
          </table>
        </div>
      </div>
      <br />
    </Fragment>
  );
};

export default Experience;
