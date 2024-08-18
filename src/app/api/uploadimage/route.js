import multer from "multer";
import nextConnect from "next-connect";
import mongoDb from "@/utils/dbConn";
import user from "@/models/userModal";
import { NextResponse } from "next/server";

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post(async (req, res) => {
  try {
    const { email } = req.body;
    const image = req.file;
    console.log(image);
    console.log(email);

    const emailExist = await user.findOne({ email: email });
    if (!emailExist) {
      return res.status(401).send({
        message: "User doesn't exist",
        success: false,
      });
    }

    const data = await user.findOneAndUpdate(
      { email: email },
      {
        profileImage: image.buffer,  // Changed from req.file.Buffer to image.buffer
        contentType: image.mimetype,
      },
      { new: true }
    );

    return res.status(201).send({
      message: "Image Updated",
      success: true,
      data: data,
    });
  } catch (error) {
    console.log("Error: " + error);
    return res.status(501).json({ message: "An Error Occurred" });
  }
});

export default apiRoute;
