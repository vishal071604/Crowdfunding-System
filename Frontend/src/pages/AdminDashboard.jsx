import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/axios";

export default function AdminDashboard() {

  const [anomalies, setAnomalies] = useState([]);

  // FETCH ANOMALIES
  const fetchAnomalies = async () => {
    try {

      const res = await API.get("/anomaly");

      setAnomalies(res.data.anomalies || []);

    } catch (error) {

      toast.error("Failed to load anomalies");
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {anomalies.length > 0 ? (

          anomalies.map((anomaly) => (

            <div
              key={anomaly._id}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
            >

              <h2 className="text-2xl font-semibold mb-3">
                Suspicious Donation
              </h2>

              <p className="mb-2">
                Type:
                <span className="ml-2 text-blue-400">
                  {anomaly.type}
                </span>
              </p>

              <p className="mb-2">
                Reason:
                <span className="ml-2 text-yellow-400">
                  {anomaly.reason}
                </span>
              </p>

              <p className="mb-2">
                Severity:
                <span
                  className={`ml-2 ${
                    anomaly.severity === "high"
                      ? "text-red-500"
                      : "text-orange-400"
                  }`}
                >
                  {anomaly.severity}
                </span>
              </p>

              <p className="mb-2">
                Fraud Score:
                <span className="ml-2 text-pink-400">
                  {anomaly.score}
                </span>
              </p>

              <p className="mb-2">
                Status:
                <span className="ml-2 text-green-400">
                  {anomaly.status}
                </span>
              </p>

              {anomaly.user && (
                <p className="mb-2">
                  User:
                  <span className="ml-2 text-slate-300">
                    {anomaly.user.name}
                  </span>
                </p>
              )}

              {anomaly.campaign && (
                <p className="mb-2">
                  Campaign:
                  <span className="ml-2 text-slate-300">
                    {anomaly.campaign.title}
                  </span>
                </p>
              )}

              <p className="text-slate-400 mt-4">
                Created:
                {" "}
                {new Date(anomaly.createdAt).toLocaleString()}
              </p>

            </div>
          ))

        ) : (

          <p>No suspicious donations found</p>

        )}

      </div>

    </div>
  );
}