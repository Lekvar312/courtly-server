import express from 'express'
import Booking from '../Models/Booking.js'
import Court from '../models/Court.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const {courtId, userId, date, startTime, endTime} = req.body
  try{
    const court = await Court.findById(courtId)
    if(!court) return res.status(404).json({ message: "Майданчик не знайдено" })
    const user = await User.findById(userId)
    if(!user) return res.status(404).json({ message: "Користувача не знайдено" })
    const existingBooging = await Booking.findOne({ courtId, userId, date, startTime, endTime })
    if(existingBooging) return res.status(400).json({ message: 'Цей час вже заброньовано' });
    const booking = new Booking({ courtId, userId, date, startTime, endTime })
    await booking.save()
    res.status(201).json({ message:"Бронювання успішно створено", booking })
  }catch(e){
    res.status(500).json({ message: "Помилка при створенні бронювання", error: e.message})
  }
})

router.get("/", async (req, res) => {
  try{
    const bookings = await Booking.find()
      .populate('courtId', 'name address')
      .populate('userId', 'name email')
    res.status(200).json(bookings)

  }catch(e){
    res.status(500).json({ message: "Помилка при отриманні бронювання", error: e.message})
  }
})

router.get("/:id", async (req, res) => {
  const {id} = req.params
  try{
    const booking = await Booking.findById(id)
      .populate('courtId', 'name address')
      .populate('userId', 'name email')
    if(!booking) res.status(404).json({ message: "Бронювання не знайдено" })
    res.status(200).json(booking)
  }catch(e){
    res.status(500).json({ message: "Помилка при отриманні бронювання", error: e.message})
  }
})

router.delete("/:id", async (req, res) => {
  const {id} = req.params
  try{
    const booking = await Booking.findByIdAndDelete(id)
    if(!booking) return res.status(404).json({ message: "Бронювання не знайдено" })
    res.status(200).json({ message:"Бронювання успішно видалено" })

  }catch(e){
    res.status(500).json({ message: "Помилка при отриманні бронювання", error: e.message})
  }
})

export default router