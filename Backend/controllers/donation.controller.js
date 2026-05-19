import axios from "axios";

import Donation from "../models/Donation.model.js";
import Campaign from "../models/Campaign.model.js";
import Anomaly from "../models/Anomaly.model.js";

import { generateTransactionHash } from "../utils/blockchain.js";

// CREATE DONATION WITH ML
export const donate = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Valid amount is required",
      });
    }

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    if (campaign.status !== "active") {
      return res.status(400).json({
        message: "Campaign is not active",
      });
    }

    // ML API CALL
    const mlResponse = await axios.post("http://127.0.0.1:5000/predict", {
      amount: Number(amount),
      targetAmount: campaign.targetAmount,
      raisedAmount: campaign.raisedAmount,
      donationCount: 1,
      userDonationCount: 1, // temporary values
    });

    const anomalyStatus = mlResponse.data.prediction;
    const fraudScore = mlResponse.data.fraudScore;

    const transactionHash = generateTransactionHash(
      campaignId,
      req.user.id,
      amount
    );

    const donation = await Donation.create({
      campaign: campaignId,
      donor: req.user.id,
      amount,
      paymentStatus: "success",
      anomalyStatus,
      transactionHash,
    });

    campaign.raisedAmount += Number(amount);
    await campaign.save();

    if (anomalyStatus === "suspicious") {
      await Anomaly.create({
        type: "donation",
        reason: "ML model detected suspicious donation",
        severity: fraudScore > 0.8 ? "high" : "medium",
        score: fraudScore,
        user: req.user.id,
        campaign: campaignId,
        donation: donation._id,
        status: "pending",
      });
    }

    return res.status(201).json({
      message: "Donation successful",
      donation,
      mlResult: {
        anomalyStatus,
        fraudScore,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET DONATIONS BY CAMPAIGN
export const getDonationById = async (
  req,
  res
) => {
  try {

    const donation = await Donation.findById(
      req.params.id
    )
      .populate(
        "donor",
        "name email"
      )
      .populate(
        "campaign",
        "title category targetAmount"
      );

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    return res.status(200).json({
      donation,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};
// GET MY DONATIONS
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id })
      .populate("campaign", "title category targetAmount raisedAmount")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "My donations fetched successfully",
      donations,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
