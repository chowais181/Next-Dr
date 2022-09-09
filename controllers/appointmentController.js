const Appointment = require("../models/appointmentModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Profile = require("../models/profileModel");
const ErrorHander = require("../utils/errorHander");

// create a new Appointment
exports.createAppointment = catchAsyncErrors(async (req, res, next) => {
  const { subject, description, bookingDate, bookingTime } = req.body;
  if (!req.user) {
    return next(new ErrorHander("Please login to access this resource.", 404));
  }
  const appointment = await Appointment.create({
    subject,
    description,
    bookingDate,
    bookingTime,
    // paymentInfo,
    // paidAt: Date.now(),
    doctorProfile: req.query.profileId,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Appointment done successfully",
    appointment,
  });
});

// get my appointments for User
exports.getMyAppointmentsUser = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHander("Please login to access this resource.", 404));
  }
  const myAppointments = await Appointment.find({ user: req.user.id }).populate(
    {
      path: "doctorProfile",
      select: "hospital location fees timing status specialist",
      populate: {
        path: "doctor",
        model: "Doctor",
        select: "name phoneNumber",
      },
    }
  );
  const total_appointments = myAppointments.length;
  res.status(200).json({
    success: true,
    total_appointments,
    myAppointments,
  });
});

// get single appointment

exports.getSingleAppointmentUser = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id).populate({
    path: "doctorProfile",
    select: "hospital location fees timing status specialist",
    populate: {
      path: "doctor",
      model: "Doctor",
      select: "name email phoneNumber",
    },
  });

  res.status(200).json({
    sucess: true,
    appointment,
  });
});

// updatde  Appointment -- user
exports.updateAppointmentUser = catchAsyncErrors(async (req, res, next) => {
  const { subject, description, bookingDate, bookingTime } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    {
      subject,
      description,
      bookingDate,
      bookingTime,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!appointment) {
    return next(new ErrorHander("Appointment not found with this Id", 404));
  }

  res.status(201).json({
    success: true,
    message: "Appointment updated successfully",
    appointment,
  });
});

// delete or cancel appointment for user
exports.deleteAppointmentUser = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);

  if (!appointment) {
    return next(new ErrorHander("Appointment not found with this Id", 404));
  }
  res.status(200).json({
    sucess: true,
    message: "Appointment Cancelled successfully",
  });
});

// get my appointments for Doctor
exports.getMyAppointmentsDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHander("Please login to access this resource.", 404));
  }
  // first get the doctor profile and then his/her appointments
  const profile = await Profile.find({ doctor: req.doctor.id });

  // console.log(profile[0].id) ; getting the profile id
  // getting the data using nested populate function
  const myAppointments = await Appointment.find({
    doctorProfile: profile[0].id,
  }).populate("user", "name email phoneNumber");
  const total_appointments = myAppointments.length;
  res.status(200).json({
    success: true,
    total_appointments,
    myAppointments,
  });
});
