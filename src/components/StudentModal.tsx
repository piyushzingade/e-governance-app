// studentmodal.tsx

import React from "react";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface Student {
  userId: string;
  name: string;
  email: string;
  phone: number;
  dob: string;
  gender: string;
  course: string;
  rollNo?: string;
  admitted?: boolean;
}

interface StudentModalProps {
  student: Student;
  onClose: () => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  student,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-black focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bld mb-4 text-black">Student Details</h2>
        <div className="space-y-4 text-black">
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Phone:</strong> {student.phone}
          </p>
          <p>
            <strong>Date of Birth:</strong> {student.dob}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender}
          </p>
          <p>
            <strong>Course:</strong> {student.course}
          </p>
          <p>
            <strong>Admitted:</strong> {student.admitted ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};
