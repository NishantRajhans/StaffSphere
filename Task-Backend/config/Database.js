import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const connect = () => {
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log("Database connection error:", err);
    });
};

export default connect;
