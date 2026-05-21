import axios from "axios";

import Donation from "../models/Donation.model.js";
import Campaign from "../models/Campaign.model.js";
import Anomaly from "../models/Anomaly.model.js";

import { generateTransactionHash } from "../utils/blockchain.js";

// CREATE DONATION WITH MOCK PAYMENT
export const donate = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const { amount, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      req.body || {};

    // CHECK AMOUNT
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Valid amount is required",
      });
    }

    // CHECK MOCK PAYMENT DETAILS
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        message: "Payment details are required",
      });
    }

    // FIND CAMPAIGN
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    // CREATOR CANNOT DONATE TO OWN CAMPAIGN
    if (campaign.creator.toString() === req.user.id) {
      return res.status(403).json({
        message: "You cannot donate to your own campaign",
      });
    }

    // CHECK CAMPAIGN STATUS
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
      userDonationCount: 1,
    });

    const anomalyStatus = mlResponse.data.prediction;
    const fraudScore = mlResponse.data.fraudScore;

    // GENERATE BLOCKCHAIN-STYLE TRANSACTION HASH
    const transactionHash = generateTransactionHash(
      campaignId,
      req.user.id,
      amount,
    );

    // CREATE DONATION
    const donation = await Donation.create({
      campaign: campaignId,
      donor: req.user.id,
      amount: Number(amount),
      paymentStatus: "success",
      anomalyStatus,
      transactionHash,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    // UPDATE CAMPAIGN RAISED AMOUNT
    campaign.raisedAmount += Number(amount);

    if (campaign.raisedAmount >= campaign.targetAmount) {
      campaign.status = "completed";
    }

    await campaign.save();

    // CREATE ANOMALY IF ML SAYS SUSPICIOUS
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

// GET MY DONATIONS
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donor: req.user.id,
    })
      .populate("campaign", "title category targetAmount raisedAmount")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      donations,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET DONATIONS BY CAMPAIGN
export const getDonationsByCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const donations = await Donation.find({
      campaign: campaignId,
    })
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      donations,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET DONATION BY ID
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("donor", "name email")
      .populate("campaign", "title category targetAmount raisedAmount");

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
