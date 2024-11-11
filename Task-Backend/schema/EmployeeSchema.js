import mongoose from 'mongoose';
const EmployeeSchema= new mongoose.Schema({
    EmployeeImage:{
        type:String,
        required:true,
    },
    EmployeeName:{
        type:String,
        required:true,
    },
    EmployeeEmail:{
        type:String,
        required:true,
    },
    EmployeePhoneNumber:{
        type:Number,
        required:true,
    },
    EmployeeDesignation:{
        type:String,
        required:true,
    },
    EmployeeGender:{
        type:String,
        required:true,
    },
    EmployeeCourse:{
        type:String,
        required:true,
    },
    EmployeeCreatedAt:{
        type:Date,
        default:Date.now,
    }
})
const Empolyee=mongoose.model("EmployeeSchema",EmployeeSchema);
export default Empolyee;