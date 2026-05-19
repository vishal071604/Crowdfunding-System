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

    image: {
      type: String,
      default: "",
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model(
  "Campaign",
  campaignSchema
);

export default Campaign;