import Campaign from "../models/campaign.model.js";

// CREATE campaign
export const createCampaign = async (req, res) => {
  try {
    const { title, description, category, targetAmount, image } = req.body;

    if (!title || !description || !category || !targetAmount || image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const campaign = await Campaign.create({
      title,
      description,
      category,
      targetAmount,
      image,
      raisedAmount: 0,
      creator: req.user.id,
      status: "active",
      isSuspicious: false,
    });

    return res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// GET all active campaigns
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: "active" })
      .populate("creator", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ campaigns });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// GET single campaign
export const getSingleCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "creator",
      "name email"
    );

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    return res.status(200).json({ campaign });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE campaign
export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (campaign.creator.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this campaign",
      });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: "Campaign updated successfully",
      campaign: updatedCampaign,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// SOFT DELETE campaign
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (
      campaign.creator.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this campaign",
      });
    }

    campaign.status = "inactive";
    await campaign.save();

    return res.status(200).json({
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// GET logged-in user's campaigns
export const getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      creator: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({ campaigns });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};