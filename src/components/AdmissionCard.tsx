"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Define the application type
interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  course: string;
  admitted: boolean;
  accepted: boolean;
  rollNo?: string;
  user: string;
}

const ApplicationCard = ({
  application,
  onPayFee,
}: {
  application: Application;
  onPayFee: () => void;
}) => {
  return (
    <div className="bg-white text-black border-2 border-gray-300 font-bold shadow-lg rounded-lg p-6 flex gap-6 items-start">
      <Image
        src={`https://avatar.iran.liara.run/public/boy?username=${application.user}`}
        alt="Student"
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
        width={300}
        height={200}
      />
      <div className="flex flex-col justify-between flex-grow">
        <h2 className="text-2xl text-black font-semibold mb-2">
          {application.name || "N/A"}
        </h2>
        <p className="text-gray-600 mb-1">
          Email: {application.email || "N/A"}
        </p>
        <p className="text-gray-600 mb-1">
          Phone: {application.phone || "N/A"}
        </p>
        <p className="text-gray-600 mb-1">DOB: {application.dob || "N/A"}</p>
        <p className="text-gray-600 mb-1">
          Gender: {application.gender || "N/A"}
        </p>
        <p className="text-gray-600 mb-1">
          Course: {application.course || "N/A"}
        </p>
        {application.admitted && (
          <p className="text-black mb-1">Roll no: {application.rollNo}</p>
        )}
        {!application.admitted && (
          <p className="text-red-500">Student not admitted yet</p>
        )}
      </div>

      {application.accepted && !application.admitted && (
        <div className="flex justify-center items-center border-2 border-blue-500 p-4 rounded-lg mt-4 w-28 bg-blue-500 hover:bg-blue-600 transition duration-300">
          <button onClick={onPayFee} className="text-white font-semibold">
            Pay Fee
          </button>
        </div>
      )}
    </div>
  );
};

const YourApplicationPage = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/students/getStudent");
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch data");
          return;
        }
        const data: Application = await response.json();
        setApplication(data);
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handlePayFee = async () => {
    if (!application) return;
    try {
      const response = await fetch("/api/students/payfee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: application._id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to process payment");
        return;
      }

      const updatedApplication: Application = await response.json();
      setApplication(updatedApplication);
      toast.success("Fee Successfully Paid");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="h-96 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto p-">
        {application && (
          <ApplicationCard application={application} onPayFee={handlePayFee} />
        )}
      </div>
    </div>
  );
};

export default YourApplicationPage;
