import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  // GET LOGGED-IN USER FROM BACKEND
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Dashboard
            </h1>

            <p className="text-slate-400">
              Welcome {user?.name || "User"} to AI Crowdfunding System
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ALL CAMPAIGNS */}
            <Link
              to="/campaigns"
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                All Campaigns
              </h2>

              <p className="text-slate-400">
                View all active fundraising campaigns.
              </p>
            </Link>

            {/* MAKE DONATION */}
            <Link
              to="/campaigns"
              className="bg-blue-600 p-6 rounded-2xl hover:bg-blue-700 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                Make Donation
              </h2>

              <p className="text-blue-100">
                Choose a campaign and donate securely.
              </p>
            </Link>

            {/* CREATE CAMPAIGN */}
            <Link
              to="/create-campaign"
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-green-500 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                Create Campaign
              </h2>

              <p className="text-slate-400">
                Start your own crowdfunding campaign.
              </p>
            </Link>

            {/* MY CAMPAIGNS */}
            <Link
              to="/my-campaigns"
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-yellow-500 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                My Campaigns
              </h2>

              <p className="text-slate-400">
                View campaigns created by you.
              </p>
            </Link>

            {/* MY DONATIONS */}
            <Link
              to="/my-donations"
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                My Donations
              </h2>

              <p className="text-slate-400">
                View your donation history and transaction hashes.
              </p>
            </Link>

            {/* ADMIN ONLY */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="bg-red-900 p-6 rounded-2xl border border-red-700 hover:bg-red-800 transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Admin Dashboard
                </h2>

                <p className="text-red-200">
                  Review suspicious donations and anomaly reports.
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}