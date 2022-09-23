const Appointment = require("../models/appointmentModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Profile = require("../models/profileModel");
const ErrorHander = require("../utils/errorHander");
const moment = require("moment");
// create a new Appointment
exports.createAppointment = catchAsyncErrors(async (req, res, next) => {
  // dr cannot book appointment with his-self
  const profile = await Profile.findById(req.query.profileId);
  // to ignore the user who have no profile
  // console.log(profile?.doctor.toString(), req.user.id);
  if (profile) {
    if (profile?.doctor.toString() === req.user.id) {
      return next(
        new ErrorHander("You cannot book appointment with your own.", 404)
      );
    }
  }

  const {
    description,
    bookingDate,
    bookingTime,
    patientName,
    fatherName,
    age,
  } = req.body;
  if (!req.user) {
    return next(new ErrorHander("Please login to access this resource.", 404));
  }

  const appointment = await Appointment.create({
    description,
    patientName,
    fatherName,
    age,
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

// check appointment availability
exports.checkAppointmentAvailability = catchAsyncErrors(
  async (req, res, next) => {
    // const date = moment(req.body.bookingDate, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.bookingTime, "HH:mm")
      .subtract(1, "hours")
      .format("hh:mm");

    const toTime = moment(req.body.bookingTime, "HH:mm")
      .add(1, "hours")
      .format("hh:mm");

    console.log(fromTime, toTime);

    const doctorProfile = req.body.doctorProfile;
    const appointments = await Appointment.find({
      doctorProfile: doctorProfile,
      bookingDate: req.body.bookingDate,
      bookingTime: { $gte: fromTime, $lte: toTime },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointment not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointment available",
        success: true,
      });
    }
  }
);

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
        model: "User",
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
      model: "User",
      select: "name phoneNumber",
    },
  });

  res.status(200).json({
    sucess: true,
    appointment,
  });
});

// updatde  Appointment -- user
exports.updateAppointmentUser = catchAsyncErrors(async (req, res, next) => {
  const {
    patientName,
    fatherName,
    age,
    description,
    bookingDate,
    bookingTime,
  } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    {
      description,
      bookingDate,
      bookingTime,
      patientName,
      fatherName,
      age,
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
  const profile = await Profile.find({ user: req.user.id });

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

// get single appointments for Doctor
exports.getSinglAppointmentDoctor = catchAsyncErrors(async (req, res, next) => {
  // if (!req.user) {
  //   return next(new ErrorHander("Please login to access this resource.", 404));
  // }

  const appointment = await Appointment.findById(req.params.id).populate(
    "user",
    "name phoneNumber"
  );

  res.status(200).json({
    success: true,
    appointment,
  });
});

// update status of the appointment -- doctor
exports.updateStatusOfAppointment = catchAsyncErrors(async (req, res, next) => {
  const newStatus = {
    status: req.body.status,
  };

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    newStatus,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (!appointment) {
    return next(new ErrorHander("No appointment found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Appointment status updated successfully",
  });
});
