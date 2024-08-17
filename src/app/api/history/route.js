import ticket from "@/models/ticketModel";
import mongoDb from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("Come");
    await mongoDb();
    const data = await ticket.find({});
    return NextResponse.json(
      {
        message: "Data fetch Successfully",
        data: data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "An Error Occured" }, { status: 401 });
  }
}
