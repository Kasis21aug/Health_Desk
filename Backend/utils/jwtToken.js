// export const generateToken =(user,message,statusCode,res)=>{
//            const token=user.generateJsonWebToken();
//            const cookieName=user.role==="Admin" ? "adminToken":"patientToken";
//            res.status(statusCode).cookie(cookieName,token,{
//               expires: new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
//               httpOnly:true,
//            }).json({
//              success:true,
//              message,
//              user,
//              token,
//            });
// };

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Dynamically select cookie name based on user role
  let cookieName;

  if (user.role === "Admin") {
    cookieName = "adminToken";
  } else if (user.role === "Doctor") {
    cookieName = "doctorToken";
  } else {
    cookieName = "patientToken";
  }

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "Lax", // Good for local testing and basic CSRF protection
      secure: false    // Set to true in production if using HTTPS
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
