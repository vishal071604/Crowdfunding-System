import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";

export default function CampaignDetails() {
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [profile, setProfile] = useState(null);

  const [amount, setAmount] = useState("");
  const [mlResult, setMlResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [donating, setDonating] = useState(false);

  // FETCH SINGLE CAMPAIGN
  const fetchCampaign = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/campaigns/${id}`);

      setCampaign(res.data.campaign);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load campaign");
    } finally {
      setLoading(false);
    }
  };

  // FETCH LOGGED-IN USER PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");

      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE DONATION (DEMO MODE)
  const handleDonate = async (e) => {
    e.preventDefault();

    const confirmPayment = window.confirm(
      `Confirm demo payment of ₹${amount}?`,
    );

    if (!confirmPayment) {
      toast.error("Payment cancelled");
      return;
    }

    try {
      setDonating(true);

      // DEMO PAYMENT DETAILS
      const mockPaymentId = "MOCK_PAY_" + Date.now();
      const mockOrderId = "MOCK_ORDER_" + Date.now();
      const mockSignature = "MOCK_SIGNATURE_" + Date.now();

      const res = await API.post(`/donations/${id}`, {
        amount: Number(amount),
        razorpayPaymentId: mockPaymentId,
        razorpayOrderId: mockOrderId,
        razorpaySignature: mockSignature,
      });

      toast.success("Demo payment successful");
      toast.success(res.data.message);

      setMlResult(res.data.mlResult);
      setAmount("");
      fetchCampaign();
    } catch (error) {
      toast.error(error.response?.data?.message || "Donation failed");
    } finally {
      setDonating(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
    fetchProfile();
  }, [id]);

  if (loading || !campaign) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading campaign...
      </div>
    );
  }

  // CHECK IF LOGGED-IN USER IS CAMPAIGN CREATOR
  const loggedInUserId = String(profile?._id || profile?.id || "");

  const campaignCreatorId = String(
    campaign?.creator?._id || campaign?.creator || "",
  );

  const isCreator = loggedInUserId === campaignCreatorId;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        {/* CAMPAIGN IMAGE */}
        {campaign.image && (
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6">
          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-3">{campaign.title}</h1>

          {/* DESCRIPTION */}
          <p className="text-slate-400 mb-5">{campaign.description}</p>

          {/* CAMPAIGN INFO */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <p>
              Category:{" "}
              <span className="text-blue-400">{campaign.category}</span>
            </p>

            <p>
              Status: <span className="text-green-400">{campaign.status}</span>
            </p>

            <p>Target Amount: ₹{campaign.targetAmount}</p>

            <p>Raised Amount: ₹{campaign.raisedAmount}</p>

            {campaign.creator && (
              <p>
                Created By:{" "}
                <span className="text-slate-300">
                  {campaign.creator.name || "Unknown"}
                </span>
              </p>
            )}
          </div>

          {/* DONATION SECTION */}
          {isCreator ? (
            <div className="mt-6 bg-red-900/30 border border-red-700 p-5 rounded-2xl">
              <p className="text-red-400 font-semibold">
                You created this campaign. You cannot donate to your own
                campaign.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleDonate}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800"
            >
              <h2 className="text-2xl font-semibold mb-4">Make Donation</h2>

              <input
                type="number"
                placeholder="Enter donation amount"
                className="w-full p-3 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-blue-500 mb-4"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={donating}
                className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {donating ? "Processing Payment..." : "Pay & Donate"}
              </button>
            </form>
          )}

          {/* ML RESULT */}
          {mlResult && (
            <div className="mt-6 bg-slate-800 p-5 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3">
                ML Fraud Detection Result
              </h3>

              <p>
                Status:{" "}
                <span
                  className={
                    mlResult.anomalyStatus === "suspicious"
                      ? "text-red-400"
                      : "text-green-400"
                  }
                >
                  {mlResult.anomalyStatus}
                </span>
              </p>

              <p>Fraud Score: {mlResult.fraudScore}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
