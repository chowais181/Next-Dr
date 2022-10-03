const express = require("express");
const {
  createAppointment,
  checkAppointmentAvailability,
  getMyAppointmentsUser,
  getSingleAppointmentUser,
  updateAppointmentUser,
  deleteAppointmentUser,
  getMyAppointmentsDoctor,
  getSinglAppointmentDoctor,
  updateStatusOfAppointment,
} = require("../controllers/appointmentController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
// createAppointment
router
  .route("/create-appointment")
  .post(isAuthenticatedUser, createAppointment);

// checkAppointmentAvailability
router
  .route("/check-appointment-availability")
  .post(isAuthenticatedUser, checkAppointmentAvailability);

// get appointment for user
router
  .route("/my-appointments")
  .get(isAuthenticatedUser, getMyAppointmentsUser);

//get, put and delete  Appointment
router
  .route("/appointment/:id")
  .get(isAuthenticatedUser, getSingleAppointmentUser)
  .put(isAuthenticatedUser, updateAppointmentUser)
  .delete(isAuthenticatedUser, deleteAppointmentUser);

// get appointment for doctor
router
  .route("/myAppointments")
  .get(isAuthenticatedUser, getMyAppointmentsDoctor);

router
  .route("/myAppointment/:id")
  .get(isAuthenticatedUser, getSinglAppointmentDoctor)
  .put(isAuthenticatedUser, updateStatusOfAppointment);

module.exports = router;
