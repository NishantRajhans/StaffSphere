import {  useEffect } from "react";
import './gridStyle.css';
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { themeQuartz } from '@ag-grid-community/theming';
import { Edit3Icon, Search, Trash } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import axios from "axios";
const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 50, 100];
const myTheme = themeQuartz.withParams({
  accentColor: "#F47209",
  backgroundColor: "#020202",
  browserColorScheme: "dark",
  chromeBackgroundColor: {
    ref: "foregroundColor",
    mix: 0.07,
    onto: "backgroundColor"
  },
  foregroundColor: "#EFE9E9",
  headerBackgroundColor: "#070301",
  headerFontSize: 14,
  headerTextColor: "#FFF7F7"
});

const EmployeeList = ({
  Employeeslist,
  fetchEmployeeList,
  setEmployeelist,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [open, setOpen] = useState(false);
  const HandleEdit = async (data, id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/Admin/EditEmployee/${id}`,
        {
          EmployeeName: data.name,
          EmployeeEmail: data.email,
          EmployeePhoneNumber: data.number,
          EmployeeDesignation: data.designation,
          EmployeeGender: data.gender,
          EmployeeCourse: data.courses,
          EmployeeImage: data.image[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );
      console.log(response);
      fetchEmployeeList()
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  const EditButton = (props) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} size="sm">
            <Edit3Icon ></Edit3Icon>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-black text-white border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Product</DialogTitle>
            <DialogDescription className="text-slate-300 text-center">
              Click save when you've finished making changes to the Employee.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => HandleEdit(data, props.data._id))}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex gap-4 justify-center items-center">
                <div className="flex flex-col space-y-1.5 w-[47%]">
                  <Label htmlFor="name" className="text-white">
                    Employee Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter Employee Name"
                    className="bg-black border-gray-800 text-gray-300"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-[47%]">
                  <Label htmlFor="email" className="text-white">
                    Employee Email
                  </Label>
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
                  <Label htmlFor="number" className="text-white">
                    Employee Phone Number
                  </Label>
                  <Input
                    id="number"
                    placeholder="Enter Phone Number"
                    className="bg-black border-gray-800 text-gray-300"
                    type="number"
                    {...register("number", { required: true })}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-[47%]">
                  <Label htmlFor="designation" className="text-white">
                    Designation
                  </Label>
                  <Controller
                    name="designation"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger className="w-full bg-black text-white border-slate-800">
                          <SelectValue
                            placeholder="Select A Designation"
                            className="font-bold"
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-black border-slate-800">
                          <SelectGroup>
                            <SelectItem value="Hr" className="text-white">
                              Hr
                            </SelectItem>
                            <SelectItem value="Manager" className="text-white">
                              Manager
                            </SelectItem>
                            <SelectItem value="Sales" className="text-white">
                              Sales
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <div className="flex flex-col space-y-1.5 w-[47%]">
                  <Label htmlFor="gender" className="text-white">
                    Gender
                  </Label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        onValueChange={onChange}
                        value={value}
                        className="w-full"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="text-white">
                            Male
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="text-white">
                            Female
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-[47%]">
                  <Label htmlFor="course" className="text-white mt-4">
                    Course
                  </Label>
                  {["MCA", "BCA", "BSC"].map((course, index) => (
                    <div
                      key={course}
                      className="flex items-center space-x-2 text-white"
                    >
                      <Checkbox
                        id={`${course}`}
                        {...register("courses[]")}
                        value={course}
                      />
                      <Label
                        htmlFor={`${course}`}
                        className="text-sm font-medium"
                      >
                        {course}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <div className="flex flex-col space-y-1.5 w-[47%]">
                  <Label htmlFor="image" className="text-white">
                    Employee Image
                  </Label>
                  <Input
                    id="file"
                    placeholder="Enter Employee Image"
                    className="bg-black border-gray-800 text-gray-300"
                    type="file"
                    {...register("image", { required: true })}
                  />
                </div>
                <div className="flex justify-end space-y-1.5 w-[47%]">
                  <Button className="w-full mt-4">Edit Employee</Button>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  const HandleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/Admin/DeleteEmployee/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );
      console.log(response);
      fetchEmployeeList()
    } catch (err) {
      console.log(err);
    }
  };
  const DeleteButton = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size="sm">
            <Trash></Trash>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              employee account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => HandleDelete(props.data._id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "EmployeeName",
      filter: true,
    },
    {
      field: "EmployeeImage",
      filter: true,
      cellRenderer: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={params.data.EmployeeImage}
            alt="Employee"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
      ),
    },
    {
      field: "EmployeeEmail",
      filter: true,
    },
    {
      field: "EmployeePhoneNumber",
      filter: true,
    },
    {
      field: "EmployeeCourse",
      filter: true,
    },
    {
      field: "EmployeeGender",
      filter: true,
    },
    {
      field: "EmployeeDesignation",
      filter: true,
    },
    {
      field: "EmployeeCreatedAt",
      filter: true,
    },
    {
      field: "Edit",
      cellRenderer: EditButton,
    },
    {
      field: "Delete",
      cellRenderer: DeleteButton,
    },
  ]);
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState();
  useEffect(() => {
    setRowData(Employeeslist);
  }, [Employeeslist]);
  return (
    <div className="p-6">
        <div className="p-2 border rounded-lg flex gap-2 mb-4 w-[35%] shadow-sm border-slate-800">
              <Search />
              <input
                id="name"
                type="text"
                placeholder="Enter Anything..."
                className="outline-none w-full bg-black text-slate-400 border-slate-800"
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
        <div className="ag-theme-quartz-dark h-[550px]">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          quickFilterText={searchInput}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
        </div>
    </div>
  );
};

export default EmployeeList;