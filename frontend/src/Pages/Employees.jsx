import NavBar from '../Component/NavBar'
import React, { useEffect, useState } from "react";
import EmployeeList from "../Component/EmployeeList";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Employee = () => {
  const [Employeeslist, setEmployeeslist] = useState();
  const navigate=useNavigate();
  const fetchEmployeeList = async () => {
    const Employee=await axios.get("http://localhost:4000/api/v1/Admin/GetAllEmployees",{
      headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("Token")
      }
    })
    setEmployeeslist(Employee.data.Employees);
  };
  useEffect(() => {
    if(!localStorage.getItem("Token"))navigate("/LogIn")
    else fetchEmployeeList();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <div className='h-screen w-full bg-black'>
          <div className='header bg-black'>
            <EmployeeList
            Employeeslist={Employeeslist}
            fetchEmployeeList={fetchEmployeeList}
            setEmployeelist={setEmployeeslist}
          />
          </div>
        </div>
    </div>
  )
}

export default Employee;
