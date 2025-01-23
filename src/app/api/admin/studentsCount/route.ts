import { connectToDB } from "@/db/mongo";
import Student from "@/models/Student_Registration";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const studentCount = await Student.countDocuments({}).exec();

    return NextResponse.json({ studentCount }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error in Student count route" },
      { status: 500 }
    );
  }
}
