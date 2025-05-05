import Booking from "../models/Booking.js";
import Court from "../models/Court.js";
import User from "../models/User.js";

class bookingService {
  async createBooking({ courtId, userId, date, timeSlots }) {
    try {
      const court = await Court.findById(courtId);
      if (!court) throw new Error("Майданчик не знайдено");

      const user = await User.findById(userId);
      if (!user) throw new Error("Користувача не знайдено");

      // Перевіряємо, чи є перетин з існуючими бронюваннями
      const existingBooking = await Booking.findOne({ courtId, date, timeSlots: { $in: timeSlots } });
      if (existingBooking) throw new Error("Частина вибраного часу вже заброньована");

      const booking = new Booking({ courtId, userId, date, timeSlots });
      await booking.save();

      return booking;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getBookings() {
    try {
      return await Booking.find().populate("courtId", "name address").populate("userId", "name email");
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getBookingById(id) {
    try {
      const booking = await Booking.findById(id).populate("courtId", "name address").populate("userId", "name email");
      if (!booking) throw new Error("Бронювання не знайдено");
      return booking;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteBooking(id) {
    try {
      const booking = await Booking.findByIdAndDelete(id);
      if (!booking) throw new Error("Бронювання не знайдено");
      return booking;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default new bookingService();
