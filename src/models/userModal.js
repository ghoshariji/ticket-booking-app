import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    profileImage:{
      data:Buffer
    },
    contentType:{
      type:String,
    }
  },
  { timestamps: true }
);

const user = models.User || mongoose.model("User", userSchema);
export default user;
