import React from "react";
import { Button } from "../components/ui/button";
import { UsersRound } from 'lucide-react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar"
import { toast } from "react-toastify";
const NavLinks = [
  {
    id: 1,
    Name: "Employees",
    Link: "/Employees",
  },
  {
    id: 2,
    Name: "CreateEmployee",
    Link: "/CreateEmployee",
  },
];
const NavBar = () => {
  const location=useLocation();
  const locationName=location.pathname.split("/")[1]
  const navigate = useNavigate()
  return (
    <div className="bg-black flex justify-between items-center text-white p-2 shadow-md">
      <div className="flex justify-center items-center cursor-pointer" onClick={()=>navigate("/")}>
        <UsersRound className=" w-11 h-11"></UsersRound>
        <h1 className="text-3xl font-bold cursor-pointer" onClick={()=>navigate("/")}>StaffSphere</h1>
      </div>
      <div className="flex gap-4">
        {NavLinks.map((link) => {
          return (
            <Link to={link.Link} key={link.id} className={`cursor-pointer text-lg ${locationName==link.Name?("text-orange-400"):("text-white")}`}>
              {link.Name}
            </Link>
          );
        })}
      </div>
      <div>
        {localStorage.getItem("Token") ? (
          <div>
            <Avatar className="cursor-pointer" onClick={()=>{localStorage.removeItem("Token");navigate("/LogIn");toast.success("Admin LogOut Successfully")}}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button>SignUp</Button>
            <Button>LogIn</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
