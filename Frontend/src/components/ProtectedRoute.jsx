import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}