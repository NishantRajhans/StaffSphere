import React, { useEffect } from "react";
import NavBar from "../Component/NavBar";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateEmployee = () => {
  const { register, handleSubmit, control, formState: { errors } ,reset } = useForm();
  const navigate = useNavigate();

  const handleForm = async (data) => {
    try{
      const response=await axios.post("http://localhost:4000/api/v1/Admin/CreateEmployee",{
        EmployeeName:data.name, 
        EmployeeEmail:data.email, 
        EmployeePhoneNumber:data.number, 
        EmployeeDesignation:data.designation ,
        EmployeeGender:data.gender ,
        EmployeeCourse:data.courses,
        EmployeeImage:data.image[0]
      },{headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer "+localStorage.getItem("Token")
      }})
      reset()
    }catch(err){
      console.log(err)
    }
  };
  useEffect(()=>{
    if(!localStorage.getItem("Token"))navigate("/LogIn")
  },[])
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center my-auto h-screen bg-black">
        <Card className="w-[70%] bg-black border-gray-800 space-y-7">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-white">
              Create New Employee
            </CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Create a new employee profile with essential details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit(handleForm)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex gap-4 justify-center items-center">
                  <div className="flex flex-col space-y-1.5 w-[47%]">
                    <Label htmlFor="name" className="text-white">Employee Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter Employee Name"
                      className="bg-black border-gray-800 text-gray-300"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-[47%]">
                    <Label htmlFor="email" className="text-white">Employee Email</Label>
                    <Input
                      id="email"
                      placeholder="Enter Employee Email"
                      className="bg-black border-gray-800 text-gray-300"
                      {...register("email", { required: true })}
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-center items-center">
                  <div className="flex flex-col space-y-1.5 w-[47%]">
                    <Label htmlFor="number" className="text-white">Employee Phone Number</Label>
                    <Input
                      id="number"
                      placeholder="Enter Phone Number"
                      className="bg-black border-gray-800 text-gray-300"
                      type="number"
                      {...register("number", { required: true })}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-[47%]">
                    <Label htmlFor="designation" className="text-white">Designation</Label>
                    <Controller
                      name="designation"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger className="w-full bg-black text-white border-slate-800">
                            <SelectValue placeholder="Select A Designation" className="font-bold" />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-black border-slate-800">
                            <SelectGroup>
                              <SelectItem value="Hr" className="text-white">Hr</SelectItem>
                              <SelectItem value="Manager" className="text-white">Manager</SelectItem>
                              <SelectItem value="Sales" className="text-white">Sales</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-center items-center">
                  <div className="flex flex-col space-y-1.5 w-[47%]">
                    <Label htmlFor="gender" className="text-white">Gender</Label>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <RadioGroup onValueChange={onChange} value={value} className="w-full">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="text-white">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="text-white">Female</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-[47%]">
                    <Label htmlFor="course" className="text-white mt-4">Course</Label>
                    {["MCA", "BCA", "BSC"].map((course, index) => (
                      <div key={course} className="flex items-center space-x-2 text-white">
                        <Checkbox
                          id={`${course}`}
                          {...register("courses[]")}
                          value={course}
                        />
                        <Label htmlFor={`${course}`} className="text-sm font-medium">
                          {course}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 justify-center items-center">
                  <div className="flex flex-col space-y-1.5 w-[47%]">
                    <Label htmlFor="image" className="text-white">Employee Image</Label>
                    <Input
                      id="file"
                      placeholder="Enter Employee Image"
                      className="bg-black border-gray-800 text-gray-300"
                      type="file"
                      {...register("image", { required: true })}
                    />
                  </div>
                  <div className="flex justify-end space-y-1.5 w-[47%]">
                    <Button className="w-full mt-4">Create Employee</Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateEmployee;
