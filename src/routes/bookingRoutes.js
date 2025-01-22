import express from 'express'
import bookingController from '../controllers/bookingController.js'
import { bookingValidationSchema } from '../validation/bookingValidationSchema.js'
import { validate } from "../middleware/validationMiddleware.js"
import checkDuplicateBookingMiddleware from '../middleware/checkDuplicateBookingMiddleware.js'

const router = express.Router()

router.post('/', bookingValidationSchema, validate, checkDuplicateBookingMiddleware, bookingController.createBooking)

router.get("/", bookingController.getBookings)

router.get("/:id", bookingValidationSchema, validate, bookingController.getBookingById)

router.delete("/:id", bookingController.deleteBooking)

export default router