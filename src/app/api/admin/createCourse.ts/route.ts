
import { NextResponse } from "next/server";
import { connectToDB } from "@/db/mongo";
import Course from "@/models/Course";

export async function POST(req: Request) {
  const { name, duration, category ,batchSize,  fee } = await req.json();
  try {
    await connectToDB();
    if (!name || !duration || !category ||!batchSize || !fee) {
      return NextResponse.json(
        {
          error: "Course name , duration and fee are required",
        },
        { status: 400 }
      );
    }

    const newCourse = new Course({ name, duration, category ,batchSize, fee });
    await newCourse.save();

    return NextResponse.json(
      {
        message: "Course created successfully",
        newCourse,
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


export async function GET() {
  try {
    await connectToDB();

    const course =  Course.countDocuments({}).exec();

    return NextResponse.json({
      course
    } , {
      status :201
    })
  } catch (error) {
    console.log(error);
    NextResponse.json({
      error  : "Internal server error"
    } , {
      status : 402
    })
  }
}
