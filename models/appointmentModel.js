const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
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
      required: true,
      default: "pending",
    },
    bookingTime: {
      type: String,
      required: [true, "Enter time"],
    },
    bookingDate: {
      type: Date,
      required: [true, "Enter Data"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
