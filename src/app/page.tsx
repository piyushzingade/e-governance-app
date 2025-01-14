import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function Page() {
  
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const { role } = session.user;

   
    switch (role) {
      case "Student":
        redirect("/home"); 
        break;
      case "AdmissionAdmin":
        redirect("/superAdmin"); 
        break;
      case "SuperAdmin":
        redirect("/superAdmin"); 
        break;
      default:
        
        redirect("/unauthorized"); 
        break;
    }
  } else {

    redirect("/signin"); 
  }

  
  return null;
}
