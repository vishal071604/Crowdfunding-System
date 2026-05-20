import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import API from "../api/axios";

export default function AdminRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAdmin = async () => {
    try {
      const res = await API.get("/auth/profile");

      setUser(res.data);

      if (res.data.role !== "admin") {
        toast.error("Admin access only");
      }
    } catch (error) {
      toast.error("Please login first");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}