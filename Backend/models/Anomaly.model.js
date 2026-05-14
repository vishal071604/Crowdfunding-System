import mongoose from "mongoose";

const anomalySchema = new mongoose.Schema(
  {
    type: { // Type of anomaly (e.g., donation, campaign, user)
      type: String,
      enum: ["donation", "campaign", "user"],
      required: true,
    },

    reason: { // Reason for flagging the anomaly
      type: String,
      required: true,
    },

    severity: { // Severity level of the anomaly
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    score: { // Numerical score indicating the likelihood of fraud (0-100)
      type: Number,
      default: 0,
    },

    user: { // Reference to the User model (if applicable)
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    campaign: { // Reference to the Campaign model (if applicable)
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },

    donation: { // Reference to the Donation model (if applicable)
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },

    status: { // Status of the anomaly (e.g., pending review, reviewed, resolved)
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