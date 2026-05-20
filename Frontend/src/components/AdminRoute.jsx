import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
    } else if (user.role !== "admin") {
      toast.error("Admin access only");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}