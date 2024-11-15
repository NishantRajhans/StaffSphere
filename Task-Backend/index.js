import express from "express";
import DBconnection from "./config/Database.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import { cloudinaryConnect } from "./config/Cloudinary.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
cloudinaryConnect();
DBconnection();
app.use("/api/v1/Auth", AuthRoutes);
app.use("/api/v1/Admin", AdminRoutes);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
