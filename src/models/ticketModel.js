import mongoose, { Schema, model, models } from "mongoose";

const ticketSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
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
    type: String,
    required: true,
  },
});

const ticket = models.ticket || mongoose.model("ticket", ticketSchema);

export default ticket;
