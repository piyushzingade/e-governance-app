"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AdminAppbar = () => {
  const router = useRouter();

  const routerHandler = (path: string) => {
    router.push(path);
  };
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/signin",
      });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error)
      toast.error("Failed to log out. Please try again.");
    }
  };
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-16 w-full flex items-center justify-between border-b border-gray-500 px-4 pt-3 sm:px-10 bg-gray-900">
        <div
          className="text-2x1 font-bold text-blue-600 hover:cursor-pointer"
          onClick={() => routerHandler("/admin")}
        >
          Admin Dashboard
        </div>
        <div className="flex gap-6 text-white">
          <div
            className="hover:cursor-pointer hover:underline"
            onClick={() => routerHandler("/admin/settings")}
          >
            Settings
          </div>
          <div
            className="hover:cursor-pointer hover:underline"
            onClick={() => routerHandler("/admin/reports")}
          >
            Reports
          </div>
          <div
            className="hover:cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminAppbar;
