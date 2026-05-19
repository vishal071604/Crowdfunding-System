import express from "express";

import {
  donate,
  getDonationById,
  getMyDonations,
} from "../controllers/donation.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET logged-in user's donations
router.get("/my", authMiddleware, getMyDonations);

// GET donations by campaign
router.get(
  "/:id",
  authMiddleware,
  getDonationById
);

// CREATE donation
router.post("/:campaignId", authMiddleware, donate);

export default router;
