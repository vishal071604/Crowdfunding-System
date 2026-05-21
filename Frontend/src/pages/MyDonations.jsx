import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyDonations = async () => {
    try {
      setLoading(true);

      const res = await API.get("/donations/my");

      setDonations(res.data.donations || []);
    } catch (error) {
      toast.error("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading donations...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Donations</h1>

        {donations.length === 0 ? (
          <p className="text-slate-400">No donations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
              >
                <h2 className="text-xl font-semibold mb-3">
                  {donation.campaign?.title}
                </h2>

                <p>Amount: ₹{donation.amount}</p>

                <p>
                  Payment Status:{" "}
                  <span className="text-green-400">
                    {donation.paymentStatus}
                  </span>
                </p>

                <p>
                  Anomaly Status:{" "}
                  <span
                    className={
                      donation.anomalyStatus === "suspicious"
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {donation.anomalyStatus}
                  </span>
                </p>

                <p className="mt-3 break-all text-slate-400">
                  Transaction Hash: {donation.transactionHash}
                </p>

                <p className="mt-3 text-slate-500">
                  Donated On:{" "}
                  {new Date(donation.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}// Rules

