//superadmin/createCourse
import { NextResponse } from "next/server";
import { connectToDB } from "@/db/mongo";
import Course from "@/models/Course";

export async function POST(req: Request) {
  const { name, duration, fee } = await req.json();
  try {
    await connectToDB();
    if (!name || !duration || !fee) {
      return NextResponse.json(
        {
          error: "Course name , duration and fee are required",
        },
        { status: 400 }
      );
    }

    const newCourse = new Course({ name, duration, fee });
    await newCourse.save();

    return NextResponse.json(
      {
        message: "Course created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
