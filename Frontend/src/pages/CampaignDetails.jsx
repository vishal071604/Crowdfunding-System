import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";

export default function CampaignDetails() {
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [mlResult, setMlResult] = useState(null);

  const fetchCampaign = async () => {
    try {
      const res = await API.get(`/campaign/${id}`);
      setCampaign(res.data.campaign);
    } catch (error) {
      toast.error("Failed to load campaign");
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(`/donation/${id}`, {
        amount,
      });

      toast.success(res.data.message);
      setMlResult(res.data.mlResult);
      setAmount("");
      fetchCampaign();
    } catch (error) {
      toast.error(error.response?.data?.message || "Donation failed");
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-2xl border border-slate-800">
        {campaign.image && (
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-3">{campaign.title}</h1>

        <p className="text-slate-400 mb-4">{campaign.description}</p>

        <p>Category: {campaign.category}</p>
        <p>Target Amount: ₹{campaign.targetAmount}</p>
        <p>Raised Amount: ₹{campaign.raisedAmount}</p>
        <p>Status: {campaign.status}</p>

        {campaign.creator && (
          <p className="mt-2 text-slate-400">
            Created By: {campaign.creator.name}
          </p>
        )}

        <form onSubmit={handleDonate} className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Donate</h2>

          <input
            type="number"
            placeholder="Enter donation amount"
            className="w-full p-3 rounded-xl bg-slate-800 outline-none mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl">
            Donate Now
          </button>
        </form>

        {mlResult && (
          <div className="mt-6 bg-slate-800 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">ML Fraud Detection Result</h3>
            <p>Status: {mlResult.anomalyStatus}</p>
            <p>Fraud Score: {mlResult.fraudScore}</p>
          </div>
        )}
      </div>
    </div>
  );
}