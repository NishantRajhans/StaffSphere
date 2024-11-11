import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
const AuthMiddleware = async (req, res, next) => {
	try {
	  const token = req.headers['authorization']?.split(" ")[1]; // Safer way to extract token
	  if (!token) {
		return res.status(401).json({ success: false, message: `Token Missing` });
	  }
	  try {
		const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
		req.User = decode;
	  } catch (error) {
		return res
		  .status(401)
		  .json({ success: false, message: "Token is invalid" });
	  }
	  next();
	} catch (error) {
	  return res.status(401).json({
		success: false,
		message: `Something Went Wrong While Validating the Token`,
	  });
	}
  };
  export default AuthMiddleware
  