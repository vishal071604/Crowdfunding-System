import mongoose from "mongoose";

const anomalySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["donation", "campaign", "user"],
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    score: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },

    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Anomaly = mongoose.model("Anomaly", anomalySchema);

export default Anomaly;