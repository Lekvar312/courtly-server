import express from "express";
import userRoutes from "./userRoutes.js";
import courtRoutes from "./courtRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import authRoutes from "./authRoutes.js";
import courtTypeRoutes from "./courtTypeRoutes.js";
import reviewRouter from "./reviewRouter.js";
import path from "path";

const router = express.Router();

router.use("/static", express.static(path.resolve("src", "static")));

router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/courts", courtRoutes);
router.use("/courtType", courtTypeRoutes);
router.use("/booking", bookingRoutes);
router.use("/review", reviewRouter);

export default router;
