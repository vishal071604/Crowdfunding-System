import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import API from "../api/axios";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CHECK USER LOGIN FROM BACKEND
  const checkLogin = async () => {
    try {
      const res = await API.get("/auth/profile");

      setUser(res.data);
    } catch (error) {
      toast.error("Please login first");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // SHOW LOADING WHILE CHECKING LOGIN
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Checking login...
      </div>
    );
  }

  // IF USER NOT LOGGED IN, REDIRECT TO LOGIN
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // IF USER LOGGED IN, SHOW PAGE
  return children;
}