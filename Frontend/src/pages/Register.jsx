import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // REGISTER FUNCTION
  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(res.data.message);

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Register failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <form
        onSubmit={handleRegister}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        {/* NAME */}
        <div className="mb-4">

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter name"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        {/* EMAIL */}
        <div className="mb-4">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-6">

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-xl"
        >
          Register
        </button>

        <p className="mt-5 text-center text-slate-400">

          Already have an account?

          <Link
            to="/"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}