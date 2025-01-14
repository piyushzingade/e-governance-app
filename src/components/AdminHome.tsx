"use client";

import React, { useState, useEffect } from "react";
import { StudentModal } from "./StudentModal";
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
  admitted?: boolean;
  accepted?: boolean;
}

const AdminHome: React.FC = () => {
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
          "http://localhost:3000/api/admin/studentForms"
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
    action: "accept" | "reject"
  ) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/students/verify",
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
            ? { ...student, accepted: action === "accept" }
            : student
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCardClick = (student: Student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
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
        Dashboard Overview
      </h1>
      <p className="text-sm font-thin text-gray-700 text-start mb-5">
        Manage student applications and fee receipts
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg text-black">
            Total Applications
          </h2>
          <p className="text-2xl font-semibold text-blue-600">24</p>
          <p className="text-gray-800">+3 from yesterday</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg text-black">Pending Review</h2>
          <p className="text-2xl font-semibold text-yellow-600">12</p>
          <p className="text-gray-800">Requires attention</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
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
          </motion.div>
        )}
      </div>

      {showModal && selectedStudent && (
        <StudentModal student={selectedStudent} onClose={closeModal} />
      )}
    </div>
  );
};

export default AdminHome;
