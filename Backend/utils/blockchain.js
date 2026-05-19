import crypto from "crypto";

// FUNCTION TO GENERATE BLOCKCHAIN-STYLE TRANSACTION HASH
export const generateTransactionHash = (
  campaignId,
  donorId,
  amount
) => {
  try {

    // CREATE UNIQUE TRANSACTION STRING
    // combines campaign id, donor id, amount, and current timestamp
    const data = `${campaignId}-${donorId}-${amount}-${Date.now()}`;

    // GENERATE SHA256 HASH
    const hash = crypto

      // choose SHA256 hashing algorithm
      .createHash("sha256")

      // add transaction data into hash
      .update(data)

      // convert hash into hexadecimal string
      .digest("hex");

    // RETURN GENERATED HASH
    return hash;

  } catch (error) {

    // PRINT ERROR IF SOMETHING FAILS
    console.log(error);

    // RETURN NULL IF HASH GENERATION FAILS
    return null;
  }
};