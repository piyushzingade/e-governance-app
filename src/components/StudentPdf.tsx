"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import YourApplicationPage from "@/components/AdmissionCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface StudentDetails {
  name: string;
  email: string;
  phone: number;
  dob: string; // String for easier rendering
  gender: string;
  course: string;
  rollNo?: string;
  admitted?: boolean;
}

export default function StudentPdf() {
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/students/getStudent");
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch data");
          return;
        }
        const data: StudentDetails = await response.json();
        setStudentDetails(data);
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleDownloadPDF = () => {
    if (!studentDetails) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Student Application Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${studentDetails.name}`, 20, 30);
    doc.text(`Email: ${studentDetails.email}`, 20, 40);
    doc.text(`Phone: ${studentDetails.phone?.toString() || "N/A"}`, 20, 50);
    doc.text(`Date of Birth: ${studentDetails.dob}`, 20, 60);
    doc.text(`Gender: ${studentDetails.gender}`, 20, 70);
    doc.text(`Course: ${studentDetails.course}`, 20, 80);
    doc.text(`Roll No: ${studentDetails.rollNo || "N/A"}`, 20, 90);
    doc.text(`Admitted: ${studentDetails.admitted ? "Yes" : "No"}`, 20, 100);

    doc.text("Important Notes:", 20, 110);
    doc.text(
      "1. Ensure all your documents are submitted before the deadline.",
      20,
      120
    );
    doc.text("2. Track your application regularly for updates.", 20, 130);
    doc.text(
      "3. Contact the admissions office for any queries or assistance.",
      20,
      140
    );

    doc.save("student_application_details.pdf");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111827]">
        <AiOutlineLoading3Quarters className="text-4xl text-blue-700 animate-spin" />
        <span className="ml-4 text-lg text-gray-600">
          Loading Please Wait.....
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center items-center justify-center h-full p-80 bg-[#100c14]">
        <p className="text-red-500 text-2xl font-semibold mb-4">
          Student has not filled the admission form
        </p>
        <motion.button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/admission")}
        >
          Fill the form
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl p-4 bg-white shadow-lg rounded-lg transform m-4 transition-transform duration-300">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
            Your Application Details
          </h1>
          <p className="text-base text-gray-600">
            Review your application information and status below.
          </p>
        </div>

        {/* Main Application Details Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-3 rounded-lg shadow-md">
          <YourApplicationPage />
        </div>

        {/* Additional Information Section */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Important Notes
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>
              Ensure all your documents are submitted before the deadline.
            </li>
            <li>Track your application regularly for updates.</li>
            <li>
              Contact the admissions office for any queries or assistance.
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Download Application PDF
          </button>
        </div>
      </div>
    </div>
  );
}
