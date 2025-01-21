import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaWallet, FaFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

const Account = () => {

  const [ openMenu , setMenuOpen ] = useState(false);
  const menuRef = useRef<HTMLDivElement | null> (null);
  const router = useRouter();

  const menuToggle =() => {
    setMenuOpen((prev) => !prev)
  }

  const handleLogout = async () => {
    try {
    await signOut({
      callbackUrl: "/signin",
    });
    toast.success("Logged out successfully !!!");
    } catch (error) {
      console.log(error)
      toast.error("Failed to log out. Please try again!!!");
    }
  };

  const walletHandler = async () => {
    router.push("/wallet");
    toast.success("Opened wallet");
  };

  const yourApplicationHandler = () => {
    router.push("/student");
    toast.success("Viewing your application!");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Use "mousedown" for better response
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Profile Picture */}
      <div
        className="rounded-full bg-gray-300 cursor-pointer overflow-hidden border-2 border-gray-400 transition-all duration-200 
                   w-8 h-8 sm:w-10 sm:h-10 "
        onClick={menuToggle}
      >
        <Image
          src="https://avatar.iran.liara.run/public/boy?username=${user}"
          alt="Profile"
          className="w-full h-full object-cover"
          width={300}
          height={200}
        />
      </div>

      {/* Dropdown Menu */}
      {openMenu && (
        <div
          ref={menuRef} // Attach ref to menu container
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
        >
          {/* Wallet Option */}
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={walletHandler}
          >
            <FaWallet className="mr-2" />
            Wallet
          </button>
          {/* Your Application Option */}
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={yourApplicationHandler}
          >
            <FaFileAlt className="mr-2" />
            Your Application
          </button>
          <hr className="my-1 border-gray-200" />
          {/* Logout Option */}
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
