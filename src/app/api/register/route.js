import mongoDb from "@/utils/dbConn";
import user from "@/models/userModal";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password, location, phone } = await req.json();
    await mongoDb();
    const checkEmail = await user.findOne({ email: email });
    if (checkEmail) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 401 }
      );
    }
    // hasing the password

    const hashPassword = await bcryptjs.hash(password, 10);
    const data = new user({ name, email, password:hashPassword, location, phone });
    await data.save();
    return NextResponse.json(
      { message: "Register Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error" + error)
    return NextResponse.json({ message: "An Error Occured" }, { status: 401 });
  }
}
