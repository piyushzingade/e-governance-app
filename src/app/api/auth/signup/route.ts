import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDB } from "@/db/mongo";

export async function POST(req: Request) {
  try {
    

    const { username , email , password } = await req.json();

    if(!username || !email || !password) {
      return NextResponse.json({
        error : "Username , email , and password  are required"
      } , {
        status : 400
      })
    }

    await connectToDB();

    const existingUser = await User.findOne( {email });

    if(existingUser) {
      return NextResponse.json({
        error : "User already exists"
      } , {
        status: 400
      })
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const newUser = new User ({
      username, 
      email,
      password : hashedPassword,
    });
    await newUser.save();

    return NextResponse.json({
      message : "User created successfully",
      newUser,
    })
  } catch (error) {
    // console.error("Error during user creation:", error);
    // return NextResponse.json(
    //   { error: "Internal Server Error" },
    //   { status: 500 }
    // );

    console.error(error);
    return NextResponse.json({
      error : " Internal server error",
      status : 500
    })
  }
}
