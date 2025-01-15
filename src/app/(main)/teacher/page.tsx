import { getServerSession } from "next-auth";
import React from "react"
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TeacherHomePage from "@/components/TeacherHome";

 const TeacherHome = async () =>{

    const session  = await getServerSession(authOptions);
    
      if(!session){
        redirect('/signin');
      }
    
      const { role  } = session?.user;
      if(role ==="Student") {
        redirect('/home');
      }
    return <TeacherHomePage/>;
}   

export default TeacherHome;