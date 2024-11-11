import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from '../schema/AdminSchema.js';
const LogIn = async (req, res) => {
  try {
    const { AdminEmail, AdminPassword } = req.body;
    if (!AdminEmail || !AdminPassword) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    const AdminDetail = await Admin.findOne({ AdminEmail });
    if (!AdminDetail) {
      return res.status(200).json({
        success: false,
        message: "Admin does not exist",
      });
    }
    const isPasswordValid = await bcrypt.compare(AdminPassword, AdminDetail.AdminPassword);
    if (!isPasswordValid) {
      return res.status(200).json({
        success: false,
        message: "AdminPassword is incorrect",
      });
    }
    const Token = JWT.sign(
      {
        AdminEmail,
        AdminId: AdminDetail._id,
      },
      process.env.JWT_SECRET_KEY,
    );
    AdminDetail.AdminPassword = undefined;
    return res.status(200).json({
      success: true,
      message: "Admin LogIn successfully",
      User: AdminDetail,
      Token,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error In LogIn",
    });
  }
};
const SignUp = async (req, res) => {
    try {
      const {
        AdminFirstName,
        AdminLastName,
        AdminEmail,
        AdminPassword,
      } = req.body;
      if (
        !AdminFirstName ||
        !AdminLastName ||
        !AdminEmail ||
        !AdminPassword
      ) {
        return res.status(200).json({
          success: false,
          message: "All fields are required",
        });
      }
      const User = await Admin.findOne({ AdminEmail: AdminEmail });
      if (User) {
        return res.status(200).json({
          success: false,
          message: "Admin already exists",
        });
      }
      const hashedAdminPassword = await bcrypt.hash(AdminPassword, 10);
      const NewUser = await Admin.create({
        AdminFirstName: AdminFirstName,
        AdminLastName: AdminLastName,
        AdminEmail: AdminEmail,
        AdminPassword: hashedAdminPassword,
      });
      return res.status(200).json({
        success: true,
        message: "SignUp Successfully",
        NewUser: NewUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(200).json({ success: false, message: "Error In SignUp" });
    }
  };
  export {LogIn,SignUp}