import express from 'express';
import {LogIn, SignUp} from "../controllers/AuthController.js";
const router = express.Router();
router.post('/LogIn', LogIn);
router.post('/SignUp', SignUp);
export default router;
