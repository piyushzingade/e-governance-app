"use client";

import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import axios from "axios"
import { Input } from "./ui/input";
import { Label } from "./ui/label";
interface Student {
  _id: string;
  userId: string;
  name: string;
  email: string;
  course: string;
  rollNo?: string;
  admitted?: boolean;
  accepted?: boolean;
}

type Course = {
  name: string;
  category: string;
  batchSize: number;
  duration : string,
  fee: string;  
};

type Fine = {
  student: string;
  id: string;
  fineType: string;
  amount: number;
  status: string;
  dueDate: string;
}; 

const AdminHome = () => {
  const [students, setStudents] = useState<Student[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noOfCourse ,  setNoOfCourse]  = useState<number>()
  const [noOfStudent, setNoOfStudent] = useState<number>();
  const [showAllApplications , setShowAllApplications] = useState(false)
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseData , setCourseData ] = useState({
    name: "",
    category: "",
    batchSize: Number,
    duration : "",
    fee : Number
  })
  const courseNameRef = useRef("");
  const courseDuration = useRef("");
  const courseFee = useRef<Number>(0);
  const couseCategory = useRef("");
  const courseBatchSize = useRef<Number>(0) 

  const [fines, setFines] = useState<Fine[]>([
    {
      student: "John Doe",
      id: "STD001",
      fineType: "Late Submission",
      amount: 25,
      status: "Pending",
      dueDate: "Dec 31, 2023",
    },
  ]);

  // Fetch students on mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/admin/studentForms");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch students");
  //       }
  //       const data = await response.json();
  //       console.log("Data received:", data);
  //       setStudents(data.students); 

  //       // const courseCount = await axios.get("/api/admin/createCourse");
  //       // if (!courseCount) {
  //       //   throw new Error("Failed to fetch total number of course");
  //       // }
  //       // setNoOfCourse(courseCount.data);
        

  //       // const studentCount = await axios.get("/api/admin/getStudents")
  //       // if(!studentCount){
  //       //   throw new Error('Failed to fetch total number of students ')
  //       // }
  //       // setNoOfStudent(studentCount.data)

  //     } catch (err) { 
  //       setError((err as Error).message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

    
  //   fetchData();
    
  // }, []);

  const handleAction = async (
    studentId: string,
    action: "accept" | "reject"
  ) => {
    try {
      const response = await fetch("/api/students/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update student action");
      }
      toast.success(`Student form ${action}ed successfully`);

      // Optionally update UI based on action
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId
            ? { ...student, accepted: action === "accept" }
            : student
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  

  const addCourse  = async() =>{
    try {

      const  { name , duration , category , batchSize ,  fee } = courseData;
      const response = await fetch("/api/admin/createCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          name,
          category,
          batchSize,
          duration,
          fee
        })
        
      });

      const data = await response.json();


      if (!response.ok) {
        toast.error(data.error || "Failed to submit the form.");
        return;
      }

      setCourses(data)



      toast.success("Course Added");
    } catch (error) {
      
    }
    
  }

  const addFine = () => {
    toast.success("Fine Create ");

  }

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-[#111827]">
  //       <AiOutlineLoading3Quarters className="text-4xl text-blue-600 animate-spin" />
  //       <span className="ml-4 text-lg text-gray-600">Loading students...</span>
  //     </div>
  //   );
  // }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black text-start ">
        Dashboard Overview
      </h1>

      {/* Student Application Section  */}
      <p className="text-lg font-semibold mt-5 text-gray-700 text-start mb-5">
        Manage Student Applications and Fee Receipts
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded border border-gray-700 shadow">
          <h2 className="font-semibold text-lg text-black">
            Total Applications
          </h2>
          <p className="text-2xl font-semibold text-blue-600">24</p>
          <p className="text-gray-800">+3 from yesterday</p>
        </div>
        <div className="bg-white p-4 rounded shadow border border-gray-700 ">
          <h2 className="font-semibold text-lg text-black">Pending Review</h2>
          <p className="text-2xl font-semibold text-yellow-600">12</p>
          <p className="text-gray-800">Requires attention</p>
        </div>
        <div className="bg-white p-4 rounded shadow border border-gray-700 ">
          <h2 className="font-semibold text-lg text-black">Processed Today</h2>
          <p className="text-2xl text-green-600">8</p>
          <p className="text-gray-800">Applications completed</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-black mb-4">
        Recent Applications
      </h2>

      <div className="border rounded-lg bg-white p-4">
        <motion.div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* View All button */}
          <div
            onClick={() => setShowAllApplications((prev) => !prev)}
            className="absolute top-0 right-0 mt-2 mr-2 text-blue-700 bg-white  hover:cursor-pointer hover:underline px-3 py-1 rounded"
          >
            {showAllApplications ? "View Less" : "View All"}
          </div>

          {/* Students grid */}
          {students.slice(0, 3).map((student) => (
            <div key={student._id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-black">{student.name}</h3>
              {/* <p className="text-black">Applied: {student.appliedAgo}</p> */}
              <p className="text-black">Course: {student.course}</p>
              <p className="text-black">Contact: {student.email}</p>
              <div className="flex justify-between mt-4">
                {student.accepted ? (
                  <span className="text-green-600 font-semibold">Verified</span>
                ) : (
                  <>
                    <Button
                      onClick={() => handleAction(student._id, "accept")}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleAction(student._id, "reject")}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {showAllApplications && (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {students.slice(3).map((student) => (
              <div key={student._id} className="border p-4 rounded shadow">
                <h3 className="font-bold text-black capitalize ">
                  {student.name}
                </h3>
                {/* <p className="text-black">Applied: {student.appliedAgo}</p> */}
                <p className="text-black">Course: {student.course}</p>
                <p className="text-black">Contact: {student.email}</p>
                <div className="flex justify-between mt-4">
                  {student.accepted ? (
                    <span className="text-green-600 font-semibold">
                      Verified
                    </span>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleAction(student._id, "accept")}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleAction(student._id, "reject")}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* /Course and Fine section */}
      <p className="text-lg font-semibold mt-5 text-gray-700 text-start mb-5">
        Manage Course Operation and Fine Section
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-black">Total Courses</p>
          <p className="text-2xl font-bold text-black">{noOfCourse}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-black">Total Students</p>
          <p className="text-2xl font-bold text-black">
            {courses.reduce((total, course) => total + course.batchSize, 0)}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-black">Pending Fines</p>
          <p className="text-2xl font-bold text-black">
            ${fines.reduce((total, fine) => total + fine.amount, 0)}
          </p>
        </div>
      </div>

      {/* Course Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-black font-semibold text-lg">Course Section</h2>

          <div className="text-black w-full ">
            ---------------------------------------------------------------
          </div>
          <div className="w-64">
            <Label htmlFor="Course Name" className="text-black text-xl font-medium my-2">
              Course Name<span className="text-red-500">*</span>:
            </Label>
            <Input
              className="w-full"
              type="text"
              // ref={courseNameRef}
              placeholder="Enter course name"
            />
          </div>
          <Button
            variant={"outline"}
            onClick={addCourse}
            className="mt-3 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 rounded-r-md"
          >
            Add Course
          </Button>

          <h2 className="text-lg font-bold mb-4 text-black">Recent Courses</h2>
          <ul>
            {courses.map((course, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span className="text-black">{course.name}</span>
                <span className="text-black">{course.batchSize} students</span>
              </li>
            ))}
          </ul>
        </div>
        {/*Fine section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 text-black">Recent Fines</h2>
          <ul>
            {fines.map((fine, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <div>
                  <p className="text-black">{fine.student}</p>
                  <p className="text-sm text-black">{fine.fineType}</p>
                </div>
                <span className="text-red-500 font-bold">${fine.amount}</span>
              </li>
            ))}
          </ul>
          <Button
            variant={"outline"}
            className="mt-3 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 rounded-r-md"
          >
            Add Fine
          </Button>
        </div>
      </div>
    </div>
  );
      

};

export default AdminHome;
