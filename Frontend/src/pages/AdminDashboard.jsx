import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH ALL ANOMALIES
  const fetchAnomalies = async () => {
    try {
      setLoading(true);

      const res = await API.get("/anomalies");

      setAnomalies(res.data.anomalies || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load anomalies"
      );
    } finally {
      setLoading(false);
    }
  };

  // UPDATE ANOMALY STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/anomalies/${id}`, {
        status,
      });

      toast.success(`Anomaly marked as ${status}`);

      fetchAnomalies();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update anomaly status"
      );
    }
  };

  // DELETE ANOMALY
  const deleteAnomaly = async (id) => {
    try {
      await API.delete(`/anomalies/${id}`);

      toast.success("Anomaly deleted successfully");

      fetchAnomalies();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete anomaly"
      );
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          Loading anomalies...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            Admin Dashboard
          </h1>

          {anomalies.length === 0 ? (
            <p className="text-slate-400">
              No suspicious donations found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {anomalies.map((anomaly) => (
                <div
                  key={anomaly._id}
                  className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Suspicious Donation
                  </h2>

                  <p className="mb-2">
                    Type:{" "}
                    <span className="text-blue-400">
                      {anomaly.type}
                    </span>
                  </p>

                  <p className="mb-2">
                    Reason:{" "}
                    <span className="text-yellow-400">
                      {anomaly.reason}
                    </span>
                  </p>

                  <p className="mb-2">
                    Severity:{" "}
                    <span
                      className={
                        anomaly.severity === "high"
                          ? "text-red-400"
                          : anomaly.severity === "medium"
                          ? "text-orange-400"
                          : "text-green-400"
                      }
                    >
                      {anomaly.severity}
                    </span>
                  </p>

                  <p className="mb-2">
                    Fraud Score:{" "}
                    <span className="text-pink-400">
                      {anomaly.score}
                    </span>
                  </p>

                  <p className="mb-2">
                    Status:{" "}
                    <span
                      className={
                        anomaly.status === "pending"
                          ? "text-yellow-400"
                          : anomaly.status === "reviewed"
                          ? "text-blue-400"
                          : "text-green-400"
                      }
                    >
                      {anomaly.status}
                    </span>
                  </p>

                  <hr className="my-4 border-slate-700" />

                  <p className="mb-2">
                    User:{" "}
                    <span className="text-slate-300">
                      {anomaly.user?.name || "Unknown"}
                    </span>
                  </p>

                  <p className="mb-2">
                    Email:{" "}
                    <span className="text-slate-300">
                      {anomaly.user?.email || "N/A"}
                    </span>
                  </p>

                  <p className="mb-2">
                    Campaign:{" "}
                    <span className="text-slate-300">
                      {anomaly.campaign?.title || "N/A"}
                    </span>
                  </p>

                  <p className="mb-2">
                    Donation Amount:{" "}
                    <span className="text-green-400">
                      ₹{anomaly.donation?.amount || 0}
                    </span>
                  </p>

                  <p className="text-slate-500 text-sm mt-3">
                    Created On:{" "}
                    {new Date(anomaly.createdAt).toLocaleString()}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-5">
                    <button
                      onClick={() =>
                        updateStatus(anomaly._id, "reviewed")
                      }
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-xl"
                    >
                      Mark Reviewed
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(anomaly._id, "resolved")
                      }
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
                    >
                      Resolve
                    </button>

                    <button
                      onClick={() => deleteAnomaly(anomaly._id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                    >
                      Delete
                    </button>
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