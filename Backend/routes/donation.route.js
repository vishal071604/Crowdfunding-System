import express from "express";

import {
  donate,
  getDonationsByCampaign,
  getMyDonations,
} from "../controllers/donation.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET logged-in user's donations
router.get("/my", authMiddleware, getMyDonations);

// GET donations by campaign
router.get(
  "/campaign/:campaignId",
  authMiddleware,
  getDonationsByCampaign
);

// CREATE donation
router.post("/:campaignId", authMiddleware, donate);

export default router;
