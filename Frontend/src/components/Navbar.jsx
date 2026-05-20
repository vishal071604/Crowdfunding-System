import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");

      localStorage.removeItem("user");

      toast.success("Logout successful");

      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/dashboard" className="text-xl font-bold">
          AI Crowdfunding
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/dashboard"
            className="text-slate-300 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/campaigns"
            className="text-slate-300 hover:text-white"
          >
            Campaigns
          </Link>

          <Link
            to="/create-campaign"
            className="text-slate-300 hover:text-white"
          >
            Create Campaign
          </Link>

          <Link
            to="/my-campaigns"
            className="text-slate-300 hover:text-white"
          >
            My Campaigns
          </Link>

          <Link
            to="/my-donations"
            className="text-slate-300 hover:text-white"
          >
            My Donations
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-red-400 hover:text-red-300"
            >
              Admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}