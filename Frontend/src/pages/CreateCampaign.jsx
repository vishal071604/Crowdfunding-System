import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";

export default function CreateCampaign() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  // CREATE CAMPAIGN
  const handleCreateCampaign = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("targetAmount", targetAmount);
      formData.append("category", category);
      formData.append("image", image);

      const res = await API.post(
        "/campaign/create",
        formData
      );

      toast.success(res.data.message);

      navigate("/campaigns");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create campaign"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <form
        onSubmit={handleCreateCampaign}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-xl border border-slate-800"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Campaign
        </h1>

        {/* TITLE */}
        <div className="mb-4">

          <label>Title</label>

          <input
            type="text"
            placeholder="Enter campaign title"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">

          <label>Description</label>

          <textarea
            placeholder="Enter description"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 outline-none h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>

        {/* TARGET AMOUNT */}
        <div className="mb-4">

          <label>Target Amount</label>

          <input
            type="number"
            placeholder="Enter target amount"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 outline-none"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />

        </div>

        {/* CATEGORY */}
        <div className="mb-4">

          <label>Category</label>

          <input
            type="text"
            placeholder="Education / Medical / Startup"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

        </div>

        {/* IMAGE */}
        <div className="mb-6">

          <label>Campaign Image</label>

          <input
            type="file"
            className="w-full mt-2"
            onChange={(e) => setImage(e.target.files[0])}
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-xl"
        >
          Create Campaign
        </button>

      </form>

    </div>
  );
}