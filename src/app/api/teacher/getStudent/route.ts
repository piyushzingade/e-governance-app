import { connectToDB } from "@/db/mongo";
import Student from "@/models/Student_Registration";

import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectToDB();
        const students = await Student.find({});
        console.log(students)
        if(!students){
            return NextResponse.json({ error: "Student Details Not found" }, { status: 404 });
        }

        return NextResponse.json({
            students
        });
    }catch(error){
        console.error(error);
        return NextResponse.json(
        {
            error: "Internal Server Error",
        },
        { status: 500 }
        );
    }
}