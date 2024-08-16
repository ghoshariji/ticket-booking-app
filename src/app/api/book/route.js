import mongoDb from "@/utils/dbConn";
import ticket from "@/models/ticketModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, movies, totalPrice } = await req.json();
    // database connection
    await mongoDb();
    // inserting the data
    let movieName = [];
    let movieId = [];

    movies.map((val, ind) => movieName.push(val.destinationE));
    movies.map((val, ind) => movieId.push(val.id));
    const newData = new ticket({
      userId,
      movieName,
      movieId,
      priceMovie: totalPrice,
    });
    await newData.save();
    return NextResponse.json({ message: "Purchased Successfully" }, { status: 401 });
  } catch (error) {
    console.log("Error" + error);
    return NextResponse.json({ message: "An Error Occurred" }, { status: 401 });
  }
}
