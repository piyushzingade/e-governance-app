"use client"

import { useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import motion from "framer-motion"
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
  // const [loading , setloading ]  = useState();
  const [showAllApplications , setShowAllApplications ] = useState(true);
  // const [ error  , setError] = useState("")

  async function handleAction(studentId: string, action: "accept" | "reject") {
    try {
      const response = await axios.post(
        "/api/students/verify",{
          body: JSON.stringify({ studentId, action }),
        }
      );
      if (!response) throw new Error("Failed to update student action");
      toast.success(`Student form ${action}ed successfully`);
    setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId
            ? { ...student, accepted: action === "accept" }
            : student
        )
      );
    } catch (error) {
      console.log("Error"  + error)
      // setError((err as Error).message);
    }
  };
  

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
          <div
            onClick={() => setShowAllApplications((prev) => !prev)}
            className="text-blue-400 font-light text-light hover:cursor-pointer hover:underline "
          >
            {showAllApplications ? " View all " : "View less"}
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {students.slice(0, 3).map((student) => (
            <div
              key={student._id}
              className="grid grid-cols-1 border shadow border-gray-200 p-3 rounded-xl"
            >
              <h2 className="text-lg font-medium capitalize">
                Name : {student.name}
              </h2>
              <h2 className="text-md font-normal">Email : {student.email}</h2>
              <h2 className="text-md font-normal">Course : {student.course}</h2>

              {student.accepted ? (
                <span className="text-green-600 font-semibold">Verified</span>
              ) : (
                <>
                  <button
                    onClick={() => handleAction(student._id, "accept")}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(student._id, "reject")}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          ))}

          {showAllApplications && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
                        <button
                          onClick={() => handleAction(student._id, "accept")}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(student._id, "reject")}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;