import express from "express";

import {
  donate,
  getMyDonations,
  getDonationsByCampaign,
  getDonationById,
} from "../controllers/donation.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// IMPORTANT: keep /my before /:id
router.get("/my", authMiddleware, getMyDonations);

router.get(
  "/campaign/:campaignId",
  authMiddleware,
  getDonationsByCampaign
);

router.get("/:id", authMiddleware, getDonationById);

router.post("/:campaignId", authMiddleware, donate);

export default router;