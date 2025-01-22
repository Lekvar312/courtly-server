import Booking from "../models/Booking.js";

const checkDuplicateBookingMiddleware = async (req, res, next) => {
  const {courtId, date, startTime, endTime}  = req.body
  try{
    const existingBooking = await Booking.findOne({
      courtId,
      date,
      $or: [{
          startTime: {$lt: endTime},
          endTime: {$gt:startTime}
      }]
    })
    if(existingBooking) return res.status(400).json({error: "Майданчик заброньовано на цей час "})
    next()
  }catch(e){
    res.status(500).json({error: "Щось пішло не так спробуйте ще раз"})
  }
}

export default checkDuplicateBookingMiddleware