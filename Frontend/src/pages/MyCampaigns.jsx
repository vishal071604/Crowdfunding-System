import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function MyCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyCampaigns = async () => {
    try {
      setLoading(true);

      const res = await API.get("/campaigns/my");

      setCampaigns(res.data.campaigns || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load campaigns"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCampaigns();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Campaigns</h1>

          {loading ? (
            <p>Loading campaigns...</p>
          ) : campaigns.length === 0 ? (
            <p className="text-slate-400">You have not created any campaigns.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden"
                >
                  {campaign.image && (
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-5">
                    <h2 className="text-xl font-semibold mb-2">
                      {campaign.title}
                    </h2>

                    <p className="text-slate-400 mb-3">
                      {campaign.description}
                    </p>

                    <p>Target: ₹{campaign.targetAmount}</p>
                    <p>Raised: ₹{campaign.raisedAmount}</p>
                    <p>Status: {campaign.status}</p>

                    <Link
                      to={`/campaigns/${campaign._id}`}
                      className="inline-block w-full text-center mt-4 bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}