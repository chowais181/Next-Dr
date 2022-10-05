const express = require("express");
const {
  createProfile,
  getSingleProfile,
  myProfile,
  getAllProfiles,
  updateProfile,
  deleteProfile,
  createProfileReview,
  getProfileReviews,
  deleteProfileReview,
  updateProfileStatus,
  getAllProfilesUser,
  getAllProfilesAdmin,
} = require("../controllers/profileController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

// first dr login then create profile
router.route("/create-profile").post(isAuthenticatedUser, createProfile);
router
  .route("/my-profile")
  .get(isAuthenticatedUser, myProfile)
  .put(isAuthenticatedUser, updateProfile)
  .delete(isAuthenticatedUser, deleteProfile);

// user will give the review to doctor profile
router
  .route("/create-profile-review")
  .post(isAuthenticatedUser, createProfileReview);

router
  .route("/profile-reviews")
  .get(getProfileReviews)
  .delete(isAuthenticatedUser, deleteProfileReview);

// view all doctors and their profile
router.route("/single-profile/:id").get(isAuthenticatedUser, getSingleProfile);
router.route("/all-profiles").get(isAuthenticatedUser, getAllProfiles);
router.route("/all-profiles-user").get(isAuthenticatedUser, getAllProfilesUser);

// admin -----
router
  .route("/update-profile-status/:id")
  .put(isAuthenticatedUser, updateProfileStatus);

router
  .route("/all-profiles-admin")
  .get(isAuthenticatedUser, getAllProfilesAdmin);

module.exports = router;
