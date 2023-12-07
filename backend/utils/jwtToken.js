// Create Token and saving in cookie
const sendToken = (user, statusCode, res) => {
  const userToken = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "None",
  };

  res.status(statusCode).cookie("token", userToken, options).json({
    success: true,
    user,
    userToken,
  });
};

module.exports = { sendToken };
