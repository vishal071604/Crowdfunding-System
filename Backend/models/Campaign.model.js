import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    targetAmount: {
      type: Number,
      required: true,
    },

    raisedAmount: {
      type: Number,
      default: 0,
    },

    Image: {
      type: String,
      default: "",
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isSuspicious: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Campaign =
  mongoose.models.Campaign ||
  mongoose.model("Campaign", campaignSchema);

export default Campaign;