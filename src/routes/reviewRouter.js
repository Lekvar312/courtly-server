import express from "express";
import ReviewController from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", ReviewController.createReview);

router.get("/", ReviewController.getAllReview);

router.get("/:id", ReviewController.getReviewByID);

router.put("/:id", ReviewController.updateReview);

router.delete("/:id", ReviewController.deleteReview);

export default router;
