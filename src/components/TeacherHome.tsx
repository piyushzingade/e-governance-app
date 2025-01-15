"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";

interface Student {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: number;
  dob: string;
  gender: string;
  course: string;
  isPresent : boolean;
}

const TeacherHome: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAllApplications, setShowAllApplications] = useState(false);

  // Fetch students on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/teacher/getStudents", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        setStudents(data.students); // Update students from the API response
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleAction = async (
    studentId: string,
    action: "present" | "absent"
  ) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/teacher/markStudent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId, action }),
        }
      );

      if (!response.ok) throw new Error("Failed to update student action");
      toast.success(`Student form ${action}ed successfully`);

      // Update UI based on action
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId
            ? { ...student, isPresent: action === "present" }
            : student
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111827]">
        <AiOutlineLoading3Quarters className="text-4xl text-blue-600 animate-spin" />
        <span className="ml-4 text-lg text-gray-600">Loading students...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black text-start ">
        Teacher Dashboard
      </h1>
    

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
              <div className="flex justify-between mt-4">
                  
                    <button
                      onClick={() => handleAction(student._id, "present")}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(student._id, "absent")}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
      
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
                
                <div className="flex justify-between mt-4">
                  {student.isPresent ? (
                    <span className="text-green-600 font-semibold">
                      Present
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleAction(student._id, "present")}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleAction(student._id, "absent")}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        absent
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeacherHome;
