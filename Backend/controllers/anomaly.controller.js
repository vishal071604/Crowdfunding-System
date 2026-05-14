import Anomaly from "../models/Anomaly.model.js";

// GET all anomalies
export const getAllAnomalies = async (req, res) => {
  try {
    const anomalies = await Anomaly.find()
      .populate("user", "name email")
      .populate("campaign", "title category targetAmount raisedAmount")
      .populate("donation", "amount anomalyStatus paymentStatus")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Anomalies fetched successfully",
      anomalies,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET single anomaly
export const getSingleAnomaly = async (req, res) => {
  try {
    const { id } = req.params;

    const anomaly = await Anomaly.findById(id)
      .populate("user", "name email")
      .populate("campaign", "title category targetAmount raisedAmount")
      .populate("donation", "amount anomalyStatus paymentStatus");

    if (!anomaly) {
      return res.status(404).json({
        message: "Anomaly not found",
      });
    }

    return res.status(200).json({
      message: "Anomaly fetched successfully",
      anomaly,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// UPDATE anomaly status
export const updateAnomalyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "reviewed", "resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid anomaly status",
      });
    }

    const anomaly = await Anomaly.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!anomaly) {
      return res.status(404).json({
        message: "Anomaly not found",
      });
    }

    return res.status(200).json({
      message: "Anomaly status updated successfully",
      anomaly,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// DELETE anomaly
export const deleteAnomaly = async (req, res) => {
  try {
    const { id } = req.params;

    const anomaly = await Anomaly.findByIdAndDelete(id);

    if (!anomaly) {
      return res.status(404).json({
        message: "Anomaly not found",
      });
    }

    return res.status(200).json({
      message: "Anomaly deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};