import { useState } from "react";
import { useRouter } from "next/navigation";
import Account from "./Account";

const StudentAppbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  const routerHandler = (path: string) => {
    router.push(path);
    closeMenu();
  };

  return (
    <div className="relative">
      {/* AppBar */}
      <div className="fixed top-0 left-0 h-16 w-full flex items-center justify-between border-b border-gray-500 px-4 sm:px-10 bg-[#171717]">
        {/* Logo Section */}
        <div
          className="text-xl sm:text-2xl font-bold flex items-center gap-2 cursor-pointer text-blue-500"
          onClick={() => routerHandler("/")}
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 sm:h-8"
            alt="E-Governance"
          />
          <h2 className="hidden sm:block ">E-Governance</h2>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex text-white gap-6 text-sm sm:text-base font-medium">
          {[
            "Home",
            "Admission",
            "Academics",
            "Programs",
            "Department",
            "Student",
            "Contact Us",
            
          ].map((item, index) => (
            <div
              key={index}
              className="cursor-pointer hover:underline"
              onClick={() =>
                routerHandler(`/${item.toLowerCase().replace(" ", "-")}`)
              }
            >
              {item}
            </div>
          ))}
        </div>

        {/* Account and Hamburger Menu */}
        <div className="flex items-center gap-4 pr-4">
          <Account />

          {/* Hamburger Menu */}
          <button
            className="block md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay and Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeMenu} // Close menu when clicking anywhere outside
        >
          {/* Mobile Menu */}
          <div
            className="absolute top-16 right-4 w-auto max-w-xs bg-gray-800 text-white flex flex-col gap-2 px-4 py-3 rounded-lg shadow-lg z-50"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
          >
            {[
              "Home",
              "Admission",
              "Academics",
              "Programs",
              "Department",
              "Students",
              "Contact Us",
            ].map((item, index) => (
              <div
                key={index}
                className="cursor-pointer hover:underline"
                onClick={() =>
                  routerHandler(`/${item.toLowerCase().replace(" ", "-")}`)
                }
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAppbar;
