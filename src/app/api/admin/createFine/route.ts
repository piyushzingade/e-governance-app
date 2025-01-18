//superadmin/createFine

import { NextResponse } from "next/server";
import { connectToDB } from "@/db/mongo";
import Fine from "@/models/Fine";

export async function POST(req: Request) {
  const { studentId, type, amount } = await req.json();

  try {
    await connectToDB();
    if (!studentId || !type || !amount) {
      return NextResponse.json(
        {
          error: "studnet id , fine type , and amount are rquired",
        },
        { status: 400 }
      );
    }

    const newFine = new Fine({
      studentId,
      type,
      amount,
      createdAt: new Date(),
    });

    await newFine.save();

    return NextResponse.json(
      {
        message: "fine created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: " Internal server error",
      },
      { status: 500 }
    );
  }
}
