const Profile = require("../models/profileModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorHander");
const ApiFeatures = require("../utils/apiFeatures");
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
  const profile = await Profile.find({ doctor: req.user.id }).populate(
    "doctor",
    "name email phoneNumber"
  );

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
  const resultPerPage = 8;

  const apiFeature = new ApiFeatures(
    Profile.find().populate("doctor", "name phoneNumber"),
    req.query
  )
    .search()
    .filter();

  let profiles = await apiFeature.query;

  let filteredProductsCount = profiles.length;

  apiFeature.pagination(resultPerPage);

  const total_profiles = profiles.length;
  res.status(201).json({
    success: true,
    total_profiles,
    profiles,
    filteredProductsCount,
  });
});

// delete profile
exports.deleteProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findOneAndDelete({ doctor: req.user.id });
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
  const { rating, comment, profileId } = req.body;

  const review = {
    user: req.user.id,
    rating: Number(rating),
    comment,
  };

  const profile = await Profile.findById(profileId);
  if (!profile) return next(new ErrorHander("profile not found", 404));

  const isReviewed = profile.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    profile.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    profile.reviews.push(review);
    profile.numOfReviews = profile.reviews.length;
  }

  let avg = 0;
  profile.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  profile.ratings = avg / profile.reviews.length;

  // validateBeforeSave : it checks the custom defined validations.
  await profile.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Review added successfully",
    profile,
  });
});

// Get All Reviews of a doctor profile
exports.getProfileReviews = catchAsyncErrors(async (req, res, next) => {
  // getting the profile and getting th name who gave review
  const profile = await Profile.findById(req.query.id).populate({
    path: "reviews",
    populate: {
      path: "user",
      model: "User",
      select: "name",
    },
  });

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

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  // pass only desired reviews and modfy the reviews
  await Profile.findByIdAndUpdate(
    req.query.profileId,
    {
      ratings,
      numOfReviews,
      reviews,
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
