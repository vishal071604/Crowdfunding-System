import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    campaign: { // Reference to the Campaign model
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    donor: { // Reference to the User model
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: { // Donation amount in the smallest currency unit (e.g., cents)
      type: Number,
      required: true,
    },

    paymentStatus: { // Status of the payment
      type: String,
      enum: ["success", "pending", "failed"],
      default: "success",
    },

    anomalyStatus: { // Status indicating if the donation is safe or suspicious
      type: String,
      enum: ["safe", "suspicious"],
      default: "safe",
    },

    transactionHash: { // Hash of the blockchain transaction (if applicable)
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;