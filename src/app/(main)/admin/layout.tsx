import Appbar from "@/components/Appbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {/* Fixed Appbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Appbar />
      </div>
      {/* Main Content */}
      <div className="pt-[64px]">{children}</div>
      {/* Footer and Notifications */}
      <Footer />
      <Toaster />
    </div>
  );
}
