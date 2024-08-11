import user from "@/models/userModal";
import mongoDb from "@/utils/dbConn";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req) {
  try {
    await mongoDb();
    const { email, password } = await req.json();
    const checkEmail = await user.findOne({ email: email });
    if (!checkEmail) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 401 }
      );
    }
    const checkPass = await bcrypt.compare(password, checkEmail.password);
    if (!checkPass) {
      return (
        NextResponse, json({ message: "Password Incorrect" }, { status: 401 })
      );
    }
    return NextResponse.json(
      { message: "Login Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error from the login time" + error);
    return NextResponse.json({ message: "An Error Occuered" }, { status: 501 });
  }
}
