import Campaign from "../models/Campaign.model.js";

// CREATE CAMPAIGN
export const createCampaign = async (req, res) => {
  try {
    const { title, description, category, targetAmount, image } = req.body;

    if (!title || !description || !category || !targetAmount) {
      return res.status(400).json({
        message: "All fields are required",
      });
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
    });

    return res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL CAMPAIGNS
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate("creator", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      campaigns,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE CAMPAIGN
export const getSingleCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "creator",
      "name email"
    );

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      campaign,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CAMPAIGN
export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    if (campaign.creator.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
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
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CAMPAIGN
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    if (campaign.creator.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Campaign.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY CAMPAIGNS
export const getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      creator: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      campaigns,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};