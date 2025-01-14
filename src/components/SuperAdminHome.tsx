"use client"

import { useState } from "react";

type Course = {
  name: string;
  category: string;
  students: number;
  status: string;
};

type Fine = {
  student: string;
  id: string;
  fineType: string;
  amount: number;
  status: string;
  dueDate: string;
};

export default function SuperAdminHome() {
  const [courses, setCourses] = useState<Course[]>([
    {
      name: "Advanced Mathematics",
      category: "Mathematics",
      students: 32,
      status: "Active",
    },
    {
      name: "Computer Science 101",
      category: "Computer Science",
      students: 28,
      status: "Active",
    },
  ]);

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

  const addCourse = (
    name: string,
    category: string,
    students: number,
    status: string
  ) => {
    setCourses([...courses, { name, category, students, status }]);
  };

  const addFine = (
    student: string,
    id: string,
    fineType: string,
    amount: number,
    status: string,
    dueDate: string
  ) => {
    setFines([...fines, { student, id, fineType, amount, status, dueDate }]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-black">Total Courses</p>
          <p className="text-2xl font-bold text-black">{courses.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-black">Total Students</p>
          <p className="text-2xl font-bold text-black">
            {courses.reduce((total, course) => total + course.students, 0)}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-black">Pending Fines</p>
          <p className="text-2xl font-bold text-black">
            ${fines.reduce((total, fine) => total + fine.amount, 0)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 text-black">Recent Courses</h2>
          <ul>
            {courses.map((course, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span className="text-black">{course.name}</span>
                <span className="text-black">{course.students} students</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => addCourse("New Course", "Category", 20, "Active")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Course
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 ">Recent Fines</h2>
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
          <button
            onClick={() =>
              addFine(
                "Jane Smith",
                "STD002",
                "Missing Assignment",
                30,
                "Pending",
                "Jan 15, 2024"
              )
            }
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Fine
          </button>
        </div>
      </div>
    </div>
  );
}
