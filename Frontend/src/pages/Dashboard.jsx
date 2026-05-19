import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Crowdfunding Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/campaigns"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500"
        >
          <h2 className="text-xl font-semibold">All Campaigns</h2>
          <p className="text-slate-400 mt-2">View and donate</p>
        </Link>

        <Link
          to="/create-campaign"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-green-500"
        >
          <h2 className="text-xl font-semibold">Create Campaign</h2>
          <p className="text-slate-400 mt-2">Start fundraiser</p>
        </Link>

        <Link
          to="/my-donations"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500"
        >
          <h2 className="text-xl font-semibold">My Donations</h2>
          <p className="text-slate-400 mt-2">View donation history</p>
        </Link>

        <Link
          to="/admin"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-red-500"
        >
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <p className="text-slate-400 mt-2">View anomalies</p>
        </Link>
      </div>
    </div>
  );
}