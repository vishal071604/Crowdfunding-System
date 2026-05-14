import express from "express";

import {
  createCampaign,
  getAllCampaigns,
  getSingleCampaign,
  updateCampaign,
  deleteCampaign,
  getMyCampaigns,
} from "../controllers/campaign.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE campaign
router.post("/create", authMiddleware, createCampaign);

// GET logged-in user's campaigns
router.get("/my", authMiddleware, getMyCampaigns);

// GET all campaigns
router.get("/", getAllCampaigns);

// GET single campaign
router.get("/:id", getSingleCampaign);

// UPDATE campaign
router.put("/:id", authMiddleware, updateCampaign);

// DELETE campaign
router.delete("/:id", authMiddleware, deleteCampaign);

export default router;