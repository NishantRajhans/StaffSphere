import Employee from "../schema/EmployeeSchema.js"
import {uploadImageToCloudinary} from "../config/Cloudinary.js"
import dotenv from "dotenv"
dotenv.config()
const CreateEmployee = async (req, res) => {
    try {
      const { EmployeeName, EmployeeEmail, EmployeePhoneNumber, EmployeeDesignation ,EmployeeGender ,EmployeeCourse} =
        req.body;
      const EmployeeImage = req.file;
      if (
        !EmployeeImage ||
        !EmployeeEmail ||
        !EmployeeName ||
        !EmployeePhoneNumber ||
        !EmployeeDesignation ||
        !EmployeeGender ||
        !EmployeeCourse
      ) {
        return res.status(200).json({
          success: false,
          message: "All fields are required",
        });
      }
      const ImageUrl = await uploadImageToCloudinary(EmployeeImage.path);
      const EmployeeDetails = await Employee.create({
        EmployeeImage: ImageUrl.secure_url,
        EmployeeName: EmployeeName,
        EmployeeEmail: EmployeeEmail,
        EmployeePhoneNumber: EmployeePhoneNumber,
        EmployeeDesignation: EmployeeDesignation,
        EmployeeCourse:EmployeeCourse,
        EmployeeGender,EmployeeGender,
        EmployeeCreatedAt: Date.now(),
      });
      return res.status(200).json({
        success: true,
        message: "Employee Create Successfully",
        Employee: EmployeeDetails,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "Error in creating Employee",
      });
    }
  };
  const EditEmployee = async (req, res) => {
    try {
        const { EmployeeName, EmployeeEmail, EmployeePhoneNumber, EmployeeDesignation ,EmployeeGender ,EmployeeCourse} =
        req.body;
      const EmployeeImage = req.file;
      if (
        !EmployeeImage ||
        !EmployeeEmail ||
        !EmployeeName ||
        !EmployeePhoneNumber ||
        !EmployeeDesignation ||
        !EmployeeGender ||
        !EmployeeCourse
      ) {
        return res.status(200).json({
          success: false,
          message: "All fields are required",
        });
      }
      const ImageUrl = await uploadImageToCloudinary(EmployeeImage.path);
      const EmployeeDetails = await Employee.findByIdAndUpdate(
        { _id: req.params.id },
        {
            EmployeeImage: ImageUrl.secure_url,
            EmployeeName: EmployeeName,
            EmployeeEmail: EmployeeEmail,
            EmployeePhoneNumber: EmployeePhoneNumber,
            EmployeeDesignation: EmployeeDesignation,
            EmployeeCourse:EmployeeCourse,
            EmployeeGender,EmployeeGender,
            EmployeeCreatedAt: Date.now(),
        },{new:true}
      );
      return res.status(200).json({
        success: true,
        message: "Employee Edited Successfully",
        Employee: EmployeeDetails,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "Error in creating Employee",
      });
    }
  };
 const DeleteEmployee = async (req, res) => {
    try {
      const EmployeeId = req.params.id;
      await Employee.findByIdAndDelete({ _id: EmployeeId });
      return res.status(200).json({
        success: true,
        message: "Employee Delete Successfully",
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "Error in deleting Employee",
      });
    }
  };
 const GetAllEmployees = async (req, res) => {
    try {
      const Employees = await Employee.find({})
        .exec();
      return res.status(200).json({
        success: true,
        message: "Get All Employees Successfully",
        Employees: Employees,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "Error in get all Employees",
      });
    }
  };
export {CreateEmployee, DeleteEmployee , GetAllEmployees ,EditEmployee}