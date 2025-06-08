import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";//Custom error handler to format and send consistent error responses.
import {User} from "../models/userSchema.js";//Imports the User model for interacting with the MongoDB user collection.
import {generateToken} from "../utils/jwtToken.js";
import {Appointment} from "../models/appointmentSchema.js";
import cloudinary from "cloudinary";


export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
        const {firstName,lastName,email,phone,password,gender,dob,nic,role}=req.body;

        if(
            !firstName || !lastName || !email || !phone|| !password || !gender || !dob || !nic || !role
        ){
            return next(new ErrorHandler("Please fill full form",400));
        }

        let user =await  User.findOne({email});
        if(user){
             return next(new ErrorHandler("user already registered",400));
        }
        user=await User.create({firstName,lastName,email,phone,password,gender,dob,nic,role});
        generateToken(user,"User registered",200,res); //Creates a new user and sends a token for authentication.
        
});

export const login =catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role}= req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please provide all details",400));
    }
    if(password!==confirmPassword){
          return next(new ErrorHandler("Password not matching",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
         return next(new ErrorHandler("Invalid password or email",400));
    }
    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid password or email",400));
    }
    if(role!==user.role){
         return next(new ErrorHandler("User with This role not found",400));
    }
    generateToken(user,"User Login Successfully",201,res);//Sends token on successful login.
});

// export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
//          const{firstName,lastName,email,phone,password,gender,dob,nic
//          }=req.body;
//          if(
//             !firstName || !lastName || !email || !phone|| !password || !gender || !dob || !nic
//         )
//         {
//             return next(new ErrorHandler("Please fill full form",400));
//         }
//         const isRegistered =await User.findOne({email});
//         if(isRegistered){
//             return next(new ErrorHandler("Admin with this email Already exists",400));
//         }
//         const admin=await User.create({
//             firstName,lastName,email,phone,password,gender,dob,nic,role:"Admin",
//         });
//         res.status(200).json({
//              success:true,
//              message:"New Admin Registered",
//              admin,
//         });
// });
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;

    // Validate request body
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic) {
        return next(new ErrorHandler("Please fill full form", 400));
    }

    // Check if admin already exists
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("Admin with this email Already exists", 400));
    }

    let admin;
    try {
        // Try to create new admin
        admin = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            nic,
            role: "Admin"
        });
    } catch (err) {
        // Log the error to your console for debugging
        //console.error("Admin creation error:", err);
        return next(new ErrorHandler(err.message || "User creation failed", 500));
    }

    // Send response
    res.status(200).json({
        success: true,
        message: "New Admin Registered",
        admin,
    });
});


export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
        const doctors=await User.find({role:"Doctor"});
        res.status(200).json({
             success:true,
             doctors
        });
});
export const getDoctorsCount = catchAsyncErrors(async (req, res, next) => {
  const count = await User.countDocuments({ role: "Doctor" });
  res.status(200).json({
    success: true,
    count,
  });
});


export const getUserDetails =catchAsyncErrors(async(req,res,next)=>{
       const user=req.user;
       res.status(200).json({success:true,user,});
});

//Clears the admin token cookie and logs out the admin.
export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
     res.status(200).cookie("adminToken","",{
         httpOnly:true,
         expires:new Date(Date.now()),
     }).json({
         success:true,
         message:"Admin logged out successfully",
     });
});

export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"user logged out successfully",
    });
});


export const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
      if(!req.files || Object.keys(req.files).length===0){
           return next (new ErrorHandler("Doctor Avatar Required",400));
      }
      const {docAvatar} =req.files;
      const allowedFromats=["image/png" , "image/jpeg" , "image/webp"];
      if(!allowedFromats.includes(docAvatar.mimetype)){
          return next(new ErrorHandler("File Format is not supported",400));
      }
      const {firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment}=req.body;
      if(!firstName|| !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
            return next(new ErrorHandler("Please Provide full Details",400));
      }
      const isRegistered=await User.findOne({email});
      if(isRegistered){
        return next(new ErrorHandler("Doctor with this email already exists",400));
      }
      const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath);
      if(!cloudinaryResponse || cloudinaryResponse.error){
          console.error(
              "Cloudinary error",
              cloudinaryResponse.error || "Unknown cloudinary error"
          );
          return next(
             new ErrorHandler("Failed to upload doctor avatar to cloudinary",500)
          );
      }
      const doctor =await User.create({
        firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment,role:"Doctor",
        doctorDepartment,
        docAvatar:{
              public_id:cloudinaryResponse.public_id,
              url:cloudinaryResponse.secure_url,
        },
      });
      res.status(200).json({
         succes:true,
         message:"New Doctor Registered",
         doctor,
      });
});




