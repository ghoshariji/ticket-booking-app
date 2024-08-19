// import { NextResponse } from "next/server";
// import multer from "multer";
// import { NextConnect } from "next-connect"; // Use named import

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const upload = multer({ storage: multer.memoryStorage() });

// const route = NextConnect({
//   onError(error, req, res) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// route.use(upload.single("image"));

// route.post(async (req, res) => {
//   try {
//     console.log(req.file);
//     console.log(req.body);

//     await mongoDb();

//     // Retrieve email from the request body
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const emailExist = await user.findOne({ email: email });
//     if (!emailExist) {
//       return res.status(401).send({
//         message: "User doesn't exist",
//         success: false,
//       });
//     }

//     const data = await user.findOneAndUpdate(
//       { email: email },
//       {
//         profileImage: req.file.buffer,
//         contentType: req.file.mimetype,
//       },
//       { new: true }
//     );

//     return res.status(201).send({
//       message: "Image Updated",
//       success: true,
//       data: data,
//     });
//   } catch (error) {
//     console.log("Error: " + error);
//     return res.status(501).json({ message: "An Error Occurred" });
//   }
// });

// export default route;

/// app/api/upload/route.js
// import { formidable } from 'formidable';
// import fs from 'fs';
// import { NextResponse } from 'next/server';

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js's default body parser
//   },
// };

// export async function POST(req) {
//   const form = formidable({
//     uploadDir: "./public/uploads", // Directory to save the files
//     keepExtensions: true, // Keep file extensions
//   });

//   // Convert the Web Streams API `Request` to a Node.js stream
//   const stream = req.body;

//   return new Promise((resolve, reject) => {
//     form.parse(stream, (err, fields, files) => {
//       if (err) {
//         return resolve(
//           NextResponse.json({ error: 'File upload failed' }, { status: 500 })
//         );
//       }

//       // Access the uploaded file via `files.<input_name>`
//       const file = files.image; // 'image' is the name attribute in the HTML form
//       console.log(file)
//       // Move the file to the desired location (optional)
//       // const newPath = `./public/uploads/${file.newFilename}`;
//       // fs.renameSync(file.filepath, newPath);

//       resolve(
//         NextResponse.json({ message: 'File uploaded successfully', file })
//       );
//     });
//   });
// }

import { NextRequest, NextResponse } from "next/server";
import mongoDb from "@/utils/dbConn";
import user from "@/models/userModal";
export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const image = formData.get("image");

    await mongoDb();

    console.log(email);
    console.log(image);

    const emailExist = await user.findOne({ email: email });
    if (!emailExist) {
      return NextResponse.json({
        message: "No User Found",
      });
    }
    // convert in the buffer form
    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    const data = await user.findOneAndUpdate(
      { email: email },
      { profileImage: buffer, contentType: image.type },
      { new: true }
    );

    return NextResponse.json({ message: "Profile Updated" });
  } catch (error) {
    console.log("Error: " + error);
    return NextResponse.json({ message: "An Error Occurred" });
  }
};
