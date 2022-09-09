const express = require("express");
const {
  registerDoctor,
  loginDoctor,
  logoutDoctor,
  updatePassword,
  getDoctorDetails,
  getAllDoctors,
  getSingleDoctor,
  deleteDoctor,
  updateProfile,
} = require("../controllers/doctorController");
const {
  isAuthenticatedDoctor,
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middleware/auth");
const router = express.Router();

router.route("/register-doctor").post(registerDoctor);
router.route("/login-doctor").post(loginDoctor);
router.route("/logout-doctor").get(logoutDoctor);
router.route("/password/update/me").put(isAuthenticatedDoctor, updatePassword);
router.route("/myinfo").get(isAuthenticatedDoctor, getDoctorDetails);
router.route("/myinfo/update").put(isAuthenticatedDoctor, updateProfile);

//... admin routes
router
  .route("/admin/doctors")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllDoctors);

router
  .route("/admin/doctor/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleDoctor)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDoctor);

module.exports = router;
