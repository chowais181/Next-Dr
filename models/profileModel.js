const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hospital: {
    type: String,
    required: [true, "Please enter hospital name"],
  },
  location: {
    type: String,
    required: [true, "Please enter location"],
  },
  timing: {
    type: String,
    required: [true, "Please enter time of availability "],
  },
  status: {
    type: String,
    enum: ["available", "not-available"],
    default: "available",
  },
  specialist: {
    type: String,
    required: [true, "Doctor specialist"],
  },
  fees: {
    type: Number,
    required: [true, "please enter fees"],
  },
  bio: {
    type: String,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  experience: [
    {
      position: {
        type: String,
        required: [true, "please enter your position"],
      },
      institute: {
        type: String,
        required: [true, "please enter your institute"],
      },
      from: {
        type: Date,
        required: [true, "please enter when you start"],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      university: {
        type: String,
        required: [true, "Please eneter university"],
      },
      degree: {
        type: String,
        required: [true, "Please enter degree"],
      },
      from: {
        type: Date,
        required: [true, "please enter start date"],
      },
      to: {
        type: Date,
        required: [true, "please enter end date"],
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
