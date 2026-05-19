import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaign");
      setCampaigns(res.data.campaigns || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">All Campaigns</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-slate-900 p-5 rounded-2xl border border-slate-800"
          >
            {campaign.image && (
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
            )}

            <h2 className="text-xl font-semibold">{campaign.title}</h2>

            <p className="text-slate-400 mt-2">
              {campaign.description}
            </p>

            <p className="mt-3">
              Target: ₹{campaign.targetAmount}
            </p>

            <p>
              Raised: ₹{campaign.raisedAmount}
            </p>

            <Link
              to={`/campaign/${campaign._id}`}
              className="inline-block mt-4 bg-blue-600 px-4 py-2 rounded-xl"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}