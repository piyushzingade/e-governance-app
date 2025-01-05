"use client";

import React from "react";

const ApplicationCard = ({ application }: { application: any }) => {
  return (
    <div className=" text-white font-bold shadow-md rounded-lg p-6 flex gap-6 items-center h-56">
      {/* Profile Picture */}
      <img
        src={application.imageUrl}
        alt="Student"
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
      />
      {/* Application Details */}
      <div>
        <h2 className="text-xl text-black font-medium  mb-2">
          {application.name}
        </h2>
        <p className="text-gray-300 mb-1">Email: {application.email}</p>
        <p className="text-gray-300 mb-1">Phone: {application.phone}</p>
        <p className="text-gray-300 mb-1">DOB: {application.dob}</p>
        <p className="text-gray-300 mb-1">Gender: {application.gender}</p>
        <p className="text-gray-300">Course: {application.course}</p>
      </div>
    </div>
  );
};

const YourApplicationPage = () => {
  const mockApplicationData = {
    imageUrl: "/student-photo.jpg", // Replace with the actual photo URL
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    dob: "2000-01-01",
    gender: "Male",
    course: "First Year (FY)",
  };

  return (
    <div className="h-96  text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <ApplicationCard application={mockApplicationData} />
      </div>
    </div>
  );
};

export default YourApplicationPage;
