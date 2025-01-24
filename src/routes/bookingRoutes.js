import express from 'express'
import bookingController from '../controllers/bookingController.js'
import checkDuplicateBookingMiddleware from '../middleware/checkDuplicateBookingMiddleware.js'
import { createBookingValidationSchema, editBookingValidationSchema } from '../validation/bookingValidationSchema.js'
import { validationMiddleware } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/', validationMiddleware(createBookingValidationSchema), checkDuplicateBookingMiddleware, bookingController.createBooking)

router.get("/", bookingController.getBookings)

router.get("/:id",validationMiddleware(editBookingValidationSchema),  bookingController.getBookingById)

router.delete("/:id", bookingController.deleteBooking)

export default router