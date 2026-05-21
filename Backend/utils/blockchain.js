import crypto from "crypto";

export const generateTransactionHash = (
  campaignId,
  donorId,
  amount
) => {
  const data = `${campaignId}-${donorId}-${amount}-${Date.now()}`;

  const hash = crypto
    .createHash("sha256")
    .update(data)
    .digest("hex");

  return hash;
};