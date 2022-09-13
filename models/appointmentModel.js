const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "Submitted",
  },
  bookingTime: {
    type: String,
    required: [true, "Enter time"],
  },
  bookingDate: {
    type: Date,
    required: [true, "Enter Data"],
  },
  // paymentInfo: {
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  //   status: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // paidAt: {
  //   type: Date,
  //   required: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
