import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated =catchAsyncErrors(async(req,res,next)=>{
            const token =req.cookies.adminToken;
            if(!token){
                return next(new ErrorHandler("Admin not Authenticated",400));
            }
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log("Decoded Token:", decoded);
            req.user= await User.findById(decoded.id);

            if (!req.user) {
                return next(new ErrorHandler("Admin user not found", 401));
            }

            if(req.user.role !=="Admin"){
                 return next(new ErrorHandler(`${req.user.role} not authorized for this resources`,403));
            }
            next();
});

export const isPatientAuthenticated =catchAsyncErrors(async(req,res,next)=>{
    const token =req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient not Authenticated",400));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user= await User.findById(decoded.id);

    if (!req.user) {
        return next(new ErrorHandler("Patient user not found", 401));
      }

    if(req.user.role !=="Patient"){
         return next(new ErrorHandler(`${req.user.role} not authorized for this resources`,403));
    }
    next();
});




// import { User } from "../models/userSchema.js";
// import { catchAsyncErrors } from "./catchAsyncErrors.js";
// import ErrorHandler from "./errorMiddleware.js";
// import jwt from "jsonwebtoken";

// export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
//   const token = req.cookies.adminToken;

//   if (!token) {
//     console.warn("⚠️ Admin authentication failed: No token provided");
//     return next(new ErrorHandler("Admin not authenticated", 401));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(decoded.id);

//     if (!req.user) {
//       console.warn(`⚠️ Admin authentication failed: User not found (ID: ${decoded.id})`);
//       return next(new ErrorHandler("Admin not authenticated", 401));
//     }

//     if (req.user.role !== "Admin") {
//       console.warn(`⚠️ Authorization failed: User role '${req.user.role}' not authorized for admin resources`);
//       return next(new ErrorHandler(`${req.user.role} not authorized for this resource`, 403));
//     }

//     next();
//   } catch (error) {
//     console.warn(`⚠️ Admin authentication failed: Invalid token or error - ${error.message}`);
//     return next(new ErrorHandler("Admin not authenticated", 401));
//   }
// });

// export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
//   const token = req.cookies.patientToken;

//   if (!token) {
//     console.warn("⚠️ Patient authentication failed: No token provided");
//     return next(new ErrorHandler("Patient not authenticated", 401));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(decoded.id);

//     if (!req.user) {
//       console.warn(`⚠️ Patient authentication failed: User not found (ID: ${decoded.id})`);
//       return next(new ErrorHandler("Patient not authenticated", 401));
//     }

//     if (req.user.role !== "Patient") {
//       console.warn(`⚠️ Authorization failed: User role '${req.user.role}' not authorized for patient resources`);
//       return next(new ErrorHandler(`${req.user.role} not authorized for this resource`, 403));
//     }

//     next();
//   } catch (error) {
//     console.warn(`⚠️ Patient authentication failed: Invalid token or error - ${error.message}`);
//     return next(new ErrorHandler("Patient not authenticated", 401));
//   }
// });
