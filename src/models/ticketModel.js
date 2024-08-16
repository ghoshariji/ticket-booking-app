import mongoose, { Schema, model, models } from "mongoose";

const ticketSchema = new Schema({
  userId: {
    // type: mongoose.Schema.ObjectId,
    // ref: "User",
    // required: true,
    type: Number,
    required: true,
  },
  movieName: {
    type: [],
    required: true,
  },
  movieId: {
    type: [],
    required: true,
  },
  priceMovie: {
    type: Number,
    required: true,
  },
});

const ticket = models.ticket || mongoose.model("ticket", ticketSchema);

export default ticket;
