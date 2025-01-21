
import HeroSection from "@/components/HeroSection";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/signin");
  }

  const { role }  = session.user;

  if(role !=="Student") {
    redirect("/admin");
  }
  
  return (
    
    <div className="bg-white  min-h-screen flex">
      <main className="flex-1 flex flex-col gap-6 ">
        <div className="flex-1 flex flex-col gap-4 shadow-md">
          <HeroSection/>
        </div>
      </main>
    </div>
  );
}
