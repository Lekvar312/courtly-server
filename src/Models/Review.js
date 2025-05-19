import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  theme: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.model("Review", ReviewSchema);
