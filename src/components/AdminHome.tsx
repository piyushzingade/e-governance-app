"use client"

import { useEffect, useState } from "react";
import axios from "axios"
import { NextResponse } from "next/server";

interface applicationDetailProps {
  title : string,
  count : number,
  description :string
}

interface Student {
  _id : string,
  userId : string,
  name : string ,
  email : string,
  course : string,
  admitted? : boolean,
  accepted? : boolean
}

const applicationDetail  : applicationDetailProps[]= [
  {
    title: "Total Application",
    count: 24,
    description: "+3 from yesterday",
  },
  {
    title: "Pending Review",
    count: 12,
    description: "Required Attention",
  },
  {
    title: "Processed Today",
    count: 8,
    description: "Application Completed",
  },
];


const AdminHome = () => {

  const [students , setStudents ] = useState<Student[]>([]);
  const [loading , setloading ]  = useState();
  const [allApplication , setAllApplication ] = useState(true);

  async function showStudent() {
    try {
      const response = await axios.get("/api/admin/studentForms");

      if (!response || !response.data) {
        throw new Error("Error in fetching All Student data");
      }
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error in fetching All Student data:", error);
    }
  }
  useEffect( ()=> {
    try {
      showStudent()
    } catch (error) {
      console.log("Error in useEffect "  + error)
    }
  } , [])

  return (
    <div className="bg-white text-black  h-full">
      {/* Heading  */}
      <div className="p-4 ">
        <h1 className="text-3xl font-bold  ">Dashboard Overview</h1>
        <p className="text-md font-medium text-gray-700">
          Manage Student appliaction and fee receipt
        </p>
      </div>

      {/* Application Detail */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {applicationDetail.map((details, index) => (
          <div key={index} className="border p-4 rounded shadow-md bg-gray-50">
            <h2 className="text-xl font-medium">{details.title}</h2>
            <p className="text-2xl font-bold  ">{details.count}</p>
            <p className="tect-sm font-thin text-gray-600">
              {details.description}
            </p>
          </div>
        ))}
      </div>

      {/* All Student Application */}
      <div className="border border-zinc-300 rounded-xl h-72 mx-4">
        <div className="p-4 flex  items-center  justify-between">
          <h2 className="text-2xl font-medium ">Recent Application</h2>
          <h2 className="text-blue-400 font-light text-light hover:underline ">
            {allApplication ? " View all " : "View less"}
          </h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {students.map((student) => (
            <div className="">
              <h2>{student.name}</h2>
              <h2>{student.email}</h2>
              <h2>{student.course}</h2>
              {/* <h2>{student.name}</h2>
              <h2>{student.name}</h2> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;