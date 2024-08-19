import user from "@/models/userModal";
import mongoDb from "@/utils/dbConn";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    await mongoDb();
    const data = await user.findOne({ email: email });
    return NextResponse.json({ message: "Fetch", data: data });
  } catch (error) {
    return NextResponse.json({ message: "Fetch" });
  }
};
