import React, { Fragment } from "react";
// import PropTypes from 'prop-types';
import Moment from "react-moment";
// import {deleteReview} from '../../actions/profile';
// import { connect } from 'react-redux';

const ProfileReview = ({
  doctorId,
  review: { _id, comment, date, user },
  // authUser,
  // deleteReview
}) => {
  return (
    <Fragment>
      <div className="current-review">
        <div className="img-user">
          <img className="user-pic round-img" src={user?.avatar} alt="" />
          <h6>
            <strong>{user?.name}</strong>
          </h6>
        </div>
        <div className="user-review">
          <p>{comment}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>

          <button
            // onClick={(e) => deleteReview(doctorId, _id)}
            className="btn btn-danger"
          >
            X
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileReview;
