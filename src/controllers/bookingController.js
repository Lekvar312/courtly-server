import bookingService from "../services/bookingService.js"

class bookingController {
  async createBooking (req, res) {
    const {courtId, userId, date, startTime, endTime} = req.body
    try{
      
      const booking = bookingService.createBooking({courtId, userId, date, startTime, endTime})
      res.status(201).json({ message:"Бронювання успішно створено", booking })
    }catch(e){
      res.status(500).json({ message: "Помилка при створенні бронювання", error: e.message})
    }
  }

  async getBookings (req, res) {
    try{
      const bookings = await bookingService.getBookings()
      res.status(200).json(bookings)
    }catch(e){
      res.status(500).json({ message: "Помилка при отриманні бронювання", error: e.message})
    }
  }

  async getBookingById(req, res) {
    const { id } = req.params;
    try {
      const booking = await bookingService.getBookingById(id);
      res.status(200).json(booking);
    } catch (e) {
      res.status(500).json({ message: "Помилка при отриманні бронювання", error: e.message });
    }
  }

  async deleteBooking(req, res) {
    const { id } = req.params;
    try {
      const booking = await bookingService.deleteBooking(id);
      res.status(200).json({ message: "Бронювання успішно видалено", booking });
    } catch (e) {
      res.status(500).json({ message: "Помилка при видаленні бронювання", error: e.message });
    }
  }
}

export default new bookingController()