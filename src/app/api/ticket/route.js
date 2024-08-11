import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
export async function GET() {
  try {
    // process.cwd() -> uses for the current working directory for the identification
    const filePath = path.join(process.cwd(), "dummyData", "data.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData);
    return NextResponse.json({
        message:data
    },{status:201})
  } catch (error) {
    console.log("Error" + error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 501 });
  }
}
