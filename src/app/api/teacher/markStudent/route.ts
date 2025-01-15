//teacher/markStudent

import { connectToDB } from "@/db/mongo";
import Student from "@/models/Student_Registration";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { studentId, action } = await req.json();
    if (!studentId || !action) {
      return NextResponse.json(
        {
          error: "studentId and action are required",
        },
        { status: 400 }
      );
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json(
        {
          error: "student not found",
        },
        { status: 404 }
      );
    }

    if (action === "present") {
      await Student.findByIdAndUpdate(studentId, { isPresent: true });
      return NextResponse.json(
        {
          message: "Student Present Successfully",
        },
        { status: 200 }
      );
    } else if (action === "absent") {
      await Student.findByIdAndDelete(studentId);
      return NextResponse.json(
        {
          message: "Student Absent Successfully",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Invalid action",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("error processing the request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
