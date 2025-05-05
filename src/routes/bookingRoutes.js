import express from "express";
import bookingController from "../controllers/bookingController.js";
import checkDuplicateBookingMiddleware from "../middleware/checkDuplicateBookingMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { bookingCreateValidationSchema, bookingEditValidationSchema } from "../validation/bookingValidationSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", checkDuplicateBookingMiddleware, bookingController.createBooking);

router.get("/", bookingController.getBookings);

router.get("/:id", bookingEditValidationSchema, validationMiddleware, bookingController.getBookingById);

router.delete("/:id", authMiddleware, bookingController.deleteBooking);

export default router;
