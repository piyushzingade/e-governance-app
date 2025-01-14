"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";
import {
  FaBook,
  FaDesktop,
  FaChalkboardTeacher,
  FaFlask,
  FaFutbol,
  FaUserGraduate,
  FaCheckCircle,
  FaLaptop,
  FaBriefcase,
  FaGraduationCap,
  FaBuilding,
  FaLightbulb,
} from "react-icons/fa";


const MotionCard = ({ icon, title }: { icon?: string; title: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg text-center border border-blue-200 hover:border-blue-400 transition-all"
  >
    {icon && <div className="text-5xl mb-4">{icon}</div>}
    <p className="font-medium text-gray-700">{title}</p>
  </motion.div>
);


const facilities = [
  {
    title: "Digital Library",
    description:
      "24/7 access to digital resources, e-books, and research papers.",
    icon: <FaBook />,
  },
  {
    title: "Computer Labs",
    description:
      "Modern computing facilities with high-speed internet connectivity.",
    icon: <FaDesktop />,
  },
  {
    title: "Smart Classrooms",
    description:
      "Interactive digital boards and multimedia learning facilities.",
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "Research Centers",
    description:
      "Specialized labs and research facilities for advanced studies.",
    icon: <FaFlask />,
  },
  {
    title: "Sports Complex",
    description:
      "Indoor and outdoor sports facilities for physical activities.",
    icon: <FaFutbol />,
  },
  {
    title: "Student Support Center",
    description: "Dedicated support for academic and personal guidance.",
    icon: <FaUserGraduate />,
  },
];

const facts = [
  {
    title: "Students Enrolled",
    value: "10000",
    icon: <FaUserGraduate className="text-4xl text-blue-600" />,
  },
  {
    title: "Courses Offered",
    value: "50",
    icon: <FaBook className="text-4xl text-purple-600" />,
  },
  {
    title: "Faculty Members",
    value: "200",
    icon: <FaChalkboardTeacher className="text-4xl text-orange-600" />,
  },
  {
    title: "Placement Rate %",
    value: "95",
    icon: <FaCheckCircle className="text-4xl text-green-600" />,
  },
];

const admissionCards = [
  {
    title: "First Year",
    subtitle: "Undergraduate Program",
    points: ["Online Application", "Document Upload", "Merit-based Admission"],
    bgColor: "bg-blue-500",
    buttonColor: "bg-blue-600",
  },
  {
    title: "Second Year",
    subtitle: "Undergraduate Program",
    points: ["Direct Admission", "Previous Records", "Transfer Cases"],
    bgColor: "bg-purple-500",
    buttonColor: "bg-purple-600",
  },
  {
    title: "Third Year",
    subtitle: "Undergraduate Program",
    points: [
      "Final Year Entry",
      "Specialization Selection",
      "Project Assignment",
    ],
    bgColor: "bg-green-500",
    buttonColor: "bg-green-600",
  },
  {
    title: "PG First Year",
    subtitle: "Postgraduate Program",
    points: ["Advanced Studies", "Research Orientation", "Specialized Tracks"],
    bgColor: "bg-red-500",
    buttonColor: "bg-red-600",
  },
  {
    title: "PG Second Year",
    subtitle: "Postgraduate Program",
    points: ["Thesis Work", "Research Project", "Industry Integration"],
    bgColor: "bg-blue-700",
    buttonColor: "bg-blue-800",
  },
];

const HeroSection = () => {
  const router = useRouter();
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("facts-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setStartCounting(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const hoverEffect = { whileHover: { scale: 1.1 } };

  // Card data for cleaner JSX
  const cards = [
    { title: "24/7", subtitle: "Online Access", color: "text-[#3b82f6]" },
    { title: "100%", subtitle: "Digital Process", color: "text-purple-500" },
    { title: "Fast", subtitle: "Processing", color: "text-green-500" },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#171717] text-white py-16 sm:py-20">
        <motion.div
          {...fadeInUp}
          className="container mx-auto text-center px-4 sm:px-6 lg:px-8 max-w-4xl"
        >
          {/* Header */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Welcome to the <span className="text-blue-700">E-Governance</span>{" "}
            Platform
          </h1>
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl leading-relaxed">
            Empowering institutions with efficient admissions, academics, and
            resources management for a seamless experience.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => router.push("/admission")}
              {...hoverEffect}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 transition-all"
            >
              Get Started
            </motion.button>
            <motion.button
              onClick={() => router.push("/admission")}
              {...hoverEffect}
              className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 font-semibold rounded-lg shadow-lg transition-all"
            >
              Learn More
            </motion.button>
          </div>

          {/* Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                {...hoverEffect}
                className="h-32 bg-[#262626] border border-gray-600 flex flex-col items-center justify-center py-6 rounded-lg shadow-lg"
              >
                <h1 className={`text-3xl font-bold ${card.color}`}>
                  {card.title}
                </h1>
                <p className="pt-2 text-white">{card.subtitle}</p>
              </motion.div>
            ))}
          </div>

          {/* Animated Drop Arrow */}
          <div className="flex justify-center mt-16">
            <motion.div
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
              className="text-white text-3xl hover:cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 1,
              }}
            >
              ↓
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Welcome to Our Digital Campus */}
      <section className="bg-white py-16 px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Welcome to Our Digital Campus
          </h1>
          <p className="mt-4 text-gray-600">
            Experience seamless education management through our comprehensive
            e-governance platform.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Data for Reusability */}
          {[
            {
              title: "Digital Learning",
              description:
                "Access course materials, assignments, and resources anytime, anywhere through our digital platform.",
              iconBg: "bg-blue-100",
              iconColor: "text-blue-500",
              iconPath:
                "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h2m8-16h2a2 2 0 012 2v12a2 2 0 01-2 2h-2M8 4v16m8-16v16M8 8h8m-8 4h8m-8 4h8",
            },
            {
              title: "Easy Applications",
              description:
                "Streamlined admission process with easy-to-fill forms and quick application tracking.",
              iconBg: "bg-purple-100",
              iconColor: "text-purple-500",
              iconPath:
                "M9 12h6m2 4H7m3-8h4m1 12h-8a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2z",
            },
            {
              title: "Student Support",
              description:
                "24/7 support system to help you with queries and technical assistance throughout your journey.",
              iconBg: "bg-green-100",
              iconColor: "text-green-500",
              iconPath:
                "M17 20h5v-2a6 6 0 00-9.33-5M9 12h6m2-4H7m3 8h4M3 20h5v-2a6 6 0 00-9.33-5M17 9h5V7a6 6 0 00-9.33-5M9 3h6m2 4H7m3 8h4M3 9h5V7a6 6 0 00-9.33-5",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#fafafa] shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div
                className={`flex items-center justify-center h-12 w-12 mx-auto ${feature.iconBg} rounded-full`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`h-6 w-6 ${feature.iconColor}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={feature.iconPath}
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex justify-center mt-12">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105">
            Begin Your Journey
          </button>
        </div>
      </section>

      {/* Admissions Section */}
      <section className="py-12 px-4 sm:px-10 border-t border-gray-300 bg-[#f5f5f5]">
        <div className="container mx-auto">
          {/* Header */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Admission Forms
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Choose your course level and start your application process.
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {admissionCards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
              >
                {/* Card Header */}
                <div
                  className={`p-4 ${card.bgColor} text-white text-center font-bold`}
                >
                  {card.title}
                </div>

                {/* Card Body */}
                <div className="p-4">
                  {/* Subtitle */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.subtitle}
                  </h3>

                  {/* Points */}
                  <ul className="mt-2 mb-4 space-y-2">
                    {card.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-600 space-x-2"
                      >
                        {/* Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5 text-green-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    className={`w-full py-2 px-4 text-white font-semibold rounded ${card.buttonColor} hover:opacity-90 transition-opacity`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Academic Programs
          </h2>
          <p className="text-gray-800 mb-8">
            Explore our comprehensive academic offerings designed to shape
            future leaders
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Undergraduate Programs */}
            <div className="bg-[#fafafa] shadow-md rounded-lg p-6 hover:shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <FaGraduationCap className="text-blue-500 text-2xl" />
                <h3 className="font-semibold text-lg text-black">
                  Undergraduate Programs
                </h3>
              </div>
              <ul className="text-gray-600 space-y-2 flex flex-col justify-start items-start">
                <li>• Bachelor of Science</li>
                <li>• Bachelor of Arts</li>
                <li>• Bachelor of Commerce</li>
                <li>• Bachelor of Technology</li>
              </ul>
              <a
                href="#"
                className="text-blue-500 font-medium mt-4 inline-block hover:underline"
              >
                Learn More →
              </a>
            </div>

            {/* Postgraduate Programs */}
            <div className="bg-[#fafafa] shadow-md rounded-lg p-6 hover:shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <FaBuilding className="text-purple-500 text-2xl" />
                <h3 className="font-semibold text-lg text-black">
                  Postgraduate Programs
                </h3>
              </div>
              <ul className="text-gray-600 space-y-2 flex flex-col justify-start items-start">
                <li>• Master of Science</li>
                <li>• Master of Arts</li>
                <li>• Master of Business Administration</li>
                <li>• Master of Technology</li>
              </ul>
              <a
                href="#"
                className="text-purple-500 font-medium mt-4 inline-block hover:underline"
              >
                Learn More →
              </a>
            </div>

            {/* Research Programs */}
            <div className="bg-[#fafafa] shadow-md rounded-lg p-6 hover:shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <FaLightbulb className="text-orange-500 text-2xl" />
                <h3 className="font-semibold text-lg text-black">
                  Research Programs
                </h3>
              </div>
              <ul className="text-black space-y-2 flex flex-col justify-start items-start">
                <li>• Doctoral Studies</li>
                <li>• Research Fellowships</li>
                <li>• Collaborative Research</li>
                <li>• Industry Projects</li>
              </ul>
              <a
                href="#"
                className="text-orange-500 font-medium mt-4 inline-block hover:underline"
              >
                Learn More →
              </a>
            </div>
          </div>

          <button className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition">
            Request Program Information
          </button>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 px-4 sm:px-10 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Campus Facilities
          </h2>
          <p className="text-gray-600 mb-8">
            State-of-the-art facilities to enhance your learning experience
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 text-left hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 text-4xl mb-4">
                  {facility.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {facility.title}
                </h3>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Schedule a Campus Tour
            </button>
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section
        id="facts-section"
        className="py-12 px-4 sm:px-10 bg-[#171717] border-t border-red-300"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Our Proud Facts
          </h2>
          <p className="text-gray-400 mb-8">
            Celebrating our achievements and milestones in academic excellence
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facts.map((fact, index) => (
              <div
                key={index}
                className="bg-[#262626] p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="mb-4 flex justify-center items-center">
                  {fact.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {startCounting ? (
                    <CountUp
                      start={0}
                      end={Number(fact.value)}
                      duration={2.5}
                    />
                  ) : (
                    0
                  )}
                </h3>
                <p className="text-gray-400">{fact.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Student Resources
          </h2>
          <p className="text-black mb-8">
            Access everything you need for your academic journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Digital Resources */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <FaLaptop className="text-blue-500 text-2xl" />
                <h3 className="font-semibold text-lg text-black">
                  Digital Resources
                </h3>
              </div>
              <ul className="text-black space-y-2 flex flex-col justify-start items-start">
                <li>✔️ E-Library Access</li>
                <li>✔️ Online Journals</li>
                <li>✔️ Research Databases</li>
              </ul>
            </div>

            {/* Academic Support */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <FaBook className="text-purple-500 text-2xl" />
                <h3 className="font-semibold text-lg text-black">
                  Academic Support
                </h3>
              </div>
              <ul className="text-black space-y-2 flex flex-col justify-start items-start">
                <li>✔️ Study Materials</li>
                <li>✔️ Tutoring Services</li>
                <li>✔️ Writing Center</li>
              </ul>
            </div>

            {/* Career Services */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <FaBriefcase className="text-green-500 text-2xl" />
                <h3 className="font-semibold text-lg text-black">
                  Career Services
                </h3>
              </div>
              <ul className="text-black space-y-2 flex flex-col justify-start items-start">
                <li>✔️ Career Counseling</li>
                <li>✔️ Resume Building</li>
                <li>✔️ Interview Preparation</li>
              </ul>
            </div>
          </div>

          <button className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition">
            Access Resources →
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
