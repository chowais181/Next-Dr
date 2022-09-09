const Profile = require("../models/profileModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorHander");

// -----------------------User : role (doctor)----------------

// create profile
exports.createProfile = catchAsyncErrors(async (req, res, next) => {
  // chech that the profile was created
  const checkProfile = await Profile.find({ doctor: req.user.id });

  if (checkProfile.length > 0) {
    return next(new ErrorHander("Profile already created", 400));
  }
  // check the user role is doctor -- only dr can create profile

  if (req.user.role !== "doctor") {
    return next(new ErrorHander("Only doctor can create profile", 400));
  }

  // assigning the id of the user who created his profile -- role
  req.body.doctor = req.user.id;
  const profile = req.body;
  const docProfile = await Profile.create(profile);

  res.status(201).json({
    success: true,
    message: "Doctor profile created successfully",
    docProfile,
  });
});

// get profile of the user having role dr
exports.myProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.find({ doctor: req.user.id });

  res.status(200).json({
    success: true,
    profile,
  });
}); 

// update profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findOneAndUpdate(
    { doctor: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(201).json({
    success: true,
    message: "Doctor profile updated successfully",
    profile,
  });
});

// get single profile
exports.getSingleProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id).populate(
    "doctor",
    "name phoneNumber"
  );
  res.status(201).json({
    success: true,
    profile,
  });
});

// get all profiles
exports.getAllProfiles = catchAsyncErrors(async (req, res, next) => {
  const profiles = await Profile.find().populate("doctor", "name phoneNumber");
  const total_profiles = docProfiles.length;
  res.status(201).json({
    success: true,
    total_profiles,
    profiles,
  });
});

// delete profile
exports.deleteProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findOneAndDelete({ doctor: req.doctor.id });
  if (!profile) {
    return next(new ErrorHander("Profile not found"));
  }

  res.status(200).json({
    success: true,
    message: "Doctor profile deleted successfully",
  });
});

//create doctor profile review
exports.createProfileReview = catchAsyncErrors(async (req, res, next) => {
  const { comment, profileId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    comment,
  };

  const profile = await Profile.findById(profileId);

  profile.reviews.push(review);
  profile.numOfReviews = profile.reviews.length;

  // validateBeforeSave : it checks the custom defined validations.
  await profile.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Review created successfully",
    profile,
  });
});

// Get All Reviews of a doctor profile
exports.getProfileReviews = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findById(req.query.id);

  if (!profile) {
    return next(new ErrorHander("Profile not found", 404));
  }
  profile.numOfReviews = profile.reviews.length;
  res.status(200).json({
    success: true,
    reviews: profile.reviews,
    numOfReviews: profile.numOfReviews,
  });
});

// Delete Review
exports.deleteProfileReview = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findById(req.query.profileId);

  if (!profile) {
    return next(new ErrorHander("Profile not found", 404));
  }

  // first we ignore the review that we want to delete
  const reviews = profile.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;
  // pass only desired reviews and modfy the reviews
  await Profile.findByIdAndUpdate(
    req.query.profileId,
    {
      reviews,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});
