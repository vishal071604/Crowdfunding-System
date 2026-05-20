import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH ALL CAMPAIGNS
  const fetchCampaigns = async () => {
    try {
      setLoading(true);

      const res = await API.get("/campaigns");

      setCampaigns(res.data.campaigns || []);
    } catch (error) {
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>Loading campaigns...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          All Campaigns
        </h1>

        {campaigns.length === 0 ? (
          <p className="text-slate-400">
            No campaigns found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg"
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

                  <p className="text-slate-400 mb-3 line-clamp-2">
                    {campaign.description}
                  </p>

                  <p className="mb-1">
                    Category:{" "}
                    <span className="text-blue-400">
                      {campaign.category}
                    </span>
                  </p>

                  <p className="mb-1">
                    Target: ₹{campaign.targetAmount}
                  </p>

                  <p className="mb-4">
                    Raised: ₹{campaign.raisedAmount}
                  </p>

                  <Link
                    to={`/campaigns/${campaign._id}`}
                    className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
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
  );
}