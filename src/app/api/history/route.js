import ticket from "@/models/ticketModel";
import user from "@/models/userModal";
import mongoDb from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await mongoDb();
    // this is the format for the getting the query paramter for the passed throught the utl parameter -> searchParams = new URL(req.url) -> searchParams.get("userId")
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const data = await ticket.find({ userId: userId });
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
