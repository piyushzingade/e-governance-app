import React from "react";

interface Student {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: number;
  dob: string;
  gender: string;
  course: string;
  rollNo?: string;
  accepted?: boolean;
  admitted?: boolean;
}

interface StudentCardProps {
  student: Student;
  onClick: (student: Student) => void;
}

const StudentCard = ({ student, onClick }: StudentCardProps) => {
  return (
    <div
      className="bg-white p-4 border border-black m-3 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
      onClick={() => onClick(student)}
    >
      <h2 className="text-xl font-semibold text-black mb-2 capitalize">
        {student.name}
      </h2>
      <div className="text-black">
        <p>Email : {student.email}</p>
        <p>Phone : {student.phone}</p>
        <p>DOB : {new Date(student.dob).toLocaleDateString()}</p>
        <p>Gender : {student.gender}</p>
        <p>Course : {student.course}</p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default StudentCard;
