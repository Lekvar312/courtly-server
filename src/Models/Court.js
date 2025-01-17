import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  type: {type: String, enum:['football', 'tennis', 'basketball'], required: true},
  price: {type: Number, required: true},
  workingHours:{
    startTime: {type: String, default:'08:00'},
    endTime: {type: String, default:'23:00'}
  },
})

export default mongoose.model('Court', courtSchema)