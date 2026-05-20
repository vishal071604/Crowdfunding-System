import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";

export default function CreateCampaign() {

  const navigate = useNavigate();

  // STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  // CREATE CAMPAIGN
  const handleCreateCampaign = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/campaigns/create",
        {
          title,
          description,
          targetAmount,
          category,
          image,
        }
      );

      toast.success(res.data.message);

      // CLEAR FORM
      setTitle("");
      setDescription("");
      setTargetAmount("");
      setCategory("");
      setImage("");

      // REDIRECT
      navigate("/campaigns");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create campaign"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <form
        onSubmit={handleCreateCampaign}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-2xl border border-slate-800 shadow-xl"
      >

        {/* HEADING */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Campaign
        </h1>

        {/* TITLE */}
        <div className="mb-5">

          <label className="block mb-2 text-slate-300">
            Campaign Title
          </label>

          <input
            type="text"
            placeholder="Enter campaign title"
            className="w-full p-3 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">

          <label className="block mb-2 text-slate-300">
            Description
          </label>

          <textarea
            placeholder="Enter campaign description"
            className="w-full p-3 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-blue-500 h-36 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

        </div>

        {/* TARGET AMOUNT */}
        <div className="mb-5">

          <label className="block mb-2 text-slate-300">
            Target Amount
          </label>

          <input
            type="number"
            placeholder="Enter target amount"
            className="w-full p-3 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-blue-500"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />

        </div>

        {/* CATEGORY */}
        <div className="mb-5">

          <label className="block mb-2 text-slate-300">
            Category
          </label>

          <input
            type="text"
            placeholder="Medical / Education / Startup"
            className="w-full p-3 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

        </div>

        {/* IMAGE URL */}
        <div className="mb-8">

          <label className="block mb-2 text-slate-300">
            Campaign Image URL
          </label>

          <input
            type="text"
            placeholder="Paste image URL"
            className="w-full p-3 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-blue-500"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition-all p-3 rounded-xl font-semibold"
        >
          {
            loading
            ? "Creating Campaign..."
            : "Create Campaign"
          }
        </button>

      </form>

    </div>
  );
}