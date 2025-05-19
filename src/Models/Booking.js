import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  courtId: { type: mongoose.Schema.Types.ObjectId, ref: "Court", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  timeSlots: [{ type: Date, required: true }], // Масив часових слотів
});

export default mongoose.model("Booking", bookingSchema);
