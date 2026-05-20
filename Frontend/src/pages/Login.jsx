import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      toast.success(res.data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <div className="mb-4">
          <label>Email</label>

          <input
            type="email"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 outline-none"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label>Password</label>

          <input
            type="password"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 outline-none"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
        >
          Login
        </button>

        <p className="mt-5 text-center text-slate-400">
          Don&apos;t have an account?
          <Link to="/register" className="text-blue-500 ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}