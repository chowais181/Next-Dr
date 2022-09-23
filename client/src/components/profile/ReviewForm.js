import React, { Fragment, useState } from "react";
// import {addReview} from '../../actions/review';

const ReviewForm = ({ doctorId, addReview }) => {
  const [text, setText] = useState("");

  return (
    <Fragment>
      <div className="text-area-style">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // addReview(doctorId, { text });
            setText("");
          }}
        >
          <textarea
            className="text-area"
            name="text"
            cols="30"
            rows="5"
            placeholder="Write a review"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input type="submit" value="Submit" className="btn btn-secondary" />
        </form>
      </div>
    </Fragment>
  );
};

export default ReviewForm;
