import express from "express";
import courtTypeController from "../controllers/courtTypeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, courtTypeController.createCourtType);

router.get("/", courtTypeController.getCourtType);

router.get("/:id", authMiddleware, courtTypeController.getCourtTypeById);

router.put("/:id", authMiddleware, courtTypeController.editCourtTypes);

router.delete("/:id", authMiddleware, courtTypeController.deleteCourtType);

export default router;
