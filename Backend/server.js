import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

//Loads environment variables from .env into process.env, so you can use them like process.env.PORT.
dotenv.config();

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB and start server only after DB is ready
//Calls the function that connects to MongoDB.
dbConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  });
