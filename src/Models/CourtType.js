import mongoose from "mongoose";

const courtTypeSchema = new mongoose.Schema({
  name:{type: String, unique:true, required: true}
})

export default mongoose.model("CourtType",courtTypeSchema)