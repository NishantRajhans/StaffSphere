import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleForm = async (data) => {
    console.log(data);
    const response=await axios.post("http://localhost:4000/api/v1/Auth/LogIn",
      {
        AdminEmail:data.email,
        AdminPassword:data.password
      },{
      header:{
        "Content-Type": "application/json"
      }
    }
    )
    if(response.data.success==true){
      toast.success("Admin LogIn Successfully")
      localStorage.setItem("Token",response.data.Token)
      navigate("/Employees")
    }else{
      toast.error(response.data.message)
    }
  };
  return (
    <div className="flex justify-center items-center my-auto h-screen bg-black">
      <Card className="w-[350px] bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-white">
            LogIn
          </CardTitle>
          <CardDescription className="text-gray-300 text-center">
            Access your account securely by logging in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className=" space-y-5" onSubmit={handleSubmit(handleForm)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter Your Email"
                  className="bg-black border-gray-800 text-gray-300"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter Your Password"
                  className="bg-black border-gray-800 text-gray-300"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
            <div className="flex justify-end space-y-1.5">
              <Button className="w-full">LogIn</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogIn;
