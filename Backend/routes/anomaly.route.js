import express from "express";

import {
  getAllAnomalies,
  getSingleAnomaly,
  updateAnomalyStatus,
  deleteAnomaly,
} from "../controllers/anomaly.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

// GET all anomalies
router.get("/", authMiddleware, adminMiddleware, getAllAnomalies);

// GET single anomaly
router.get("/:id", authMiddleware, adminMiddleware, getSingleAnomaly);

// UPDATE anomaly status
router.put("/:id", authMiddleware, adminMiddleware, updateAnomalyStatus);

// DELETE anomaly
router.delete("/:id", authMiddleware, adminMiddleware, deleteAnomaly);

export default router;