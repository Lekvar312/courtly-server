import express from 'express'
import bookingController from '../controllers/bookingController.js'
import { bookingValidationSchema } from '../validation/bookingValidationSchema.js'
import { validate } from "../middleware/validation.js"
const router = express.Router()

router.post('/', bookingValidationSchema, validate, bookingController.createBooking)

router.get("/", bookingController.getBookings)

router.get("/:id", bookingValidationSchema, validate, bookingController.getBookingById)

router.delete("/:id", bookingController.deleteBooking)

export default router