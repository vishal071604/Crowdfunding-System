import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/axios";

export default function MyDonations() {

  const [donations, setDonations] = useState([]);

  // FETCH MY DONATIONS
  const fetchMyDonations = async () => {
    try {

      const res = await API.get("/donation/my");

      setDonations(res.data.donations || []);

    } catch (error) {

      toast.error("Failed to load donations");
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Donations
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {donations.length > 0 ? (

          donations.map((donation) => (

            <div
              key={donation._id}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
            >

              <h2 className="text-2xl font-semibold mb-3">
                {donation.campaign?.title}
              </h2>

              <p className="mb-2">
                Amount: ₹{donation.amount}
              </p>

              <p className="mb-2">
                Payment Status: {donation.paymentStatus}
              </p>

              <p className="mb-2">
                Anomaly Status: {donation.anomalyStatus}
              </p>

              <p className="mb-2 break-all">
                Transaction Hash:
                <span className="text-green-400 ml-2">
                  {donation.transactionHash}
                </span>
              </p>

              <p className="text-slate-400 mt-3">
                Donated On:
                {" "}
                {new Date(donation.createdAt).toLocaleString()}
              </p>

            </div>
          ))

        ) : (

          <p>No donations found</p>

        )}

      </div>

    </div>
  );
}