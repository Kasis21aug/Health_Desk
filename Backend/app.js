import express from "express"; //Imports the Express framework to create the server and manage routing, middleware, etc.
import { config } from "dotenv";
import cors from "cors"; //Imports the cors middleware to enable Cross-Origin Resource Sharing, which is essential when your frontend and backend are on different domains or ports.
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import appointmentRouter from "./router/appointmentRouter.js";


config({ path: "./config/config.env" });

const app = express();

// Middlewares
app.use(cors({
  origin: true, // Allow all origins during development
  methods: ["GET", "POST", "PUT", "DELETE"],// Allowed HTTP methods
  credentials: true,// Allow cookies and auth headers
  exposedHeaders: ['Set-Cookie'],// Expose Set-Cookie header to frontend
}));

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));


app.use(cookieParser());//Adds cookie parser middleware to automatically parse cookies from HTTP requests
app.use(express.json());//Parses incoming requests with JSON payloads and populates req.body.
app.use(express.urlencoded({ extended: true }));//Parses URL-encoded form data from requests (like from HTML forms).
app.use(fileUpload({
  useTempFiles: true,//Temporary files saved on disk (instead of memory).
  tempFileDir: "/tmp/",//Temp files stored in /tmp/ directory.
}));

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Error handling middleware
app.use(errorMiddleware);

export default app;
