import mongoDb from "@/utils/dbConn";
import ticket from "@/models/ticketModel";
import { NextResponse } from "next/server";

export async function POST(req)
{
    try {
        const {userId,movieName,movieId,priceMovie} = await req.json()
        // database connection

        await mongoDb()

        // inserting the data

        const newData = new ticket(userId,movieName,movieId,priceMovie);
        await newData.save()
        return NextResponse({message:"Purchased Successfully"},{status:401})
    } catch (error) {
        console.log("Error" + error)
        return NextResponse({message:"An Error Occurred"},{status:401})
    }
}