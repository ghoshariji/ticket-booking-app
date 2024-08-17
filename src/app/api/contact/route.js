import contactModel from "@/models/contactModel";
import { NextResponse } from "next/server";

const { default: mongoDb } = require("@/utils/dbConn");

export async function POST(req) {
  try {
    await mongoDb();
    const { post } = await req.json();
    const newData = await contactModel(post)
    await newData.save()
    return NextResponse.json(
      {
        message: "Data fetch Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error" + error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 401 });
  }
}
