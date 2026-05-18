import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import MyDonations from "./pages/MyDonations";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* CAMPAIGNS */}
        <Route path="/campaigns" element={<Campaigns />} />

        <Route
          path="/create-campaign"
          element={<CreateCampaign />}
        />

        <Route
          path="/campaign/:id"
          element={<CampaignDetails />}
        />

        {/* DONATIONS */}
        <Route
          path="/my-donations"
          element={<MyDonations />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}
