import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

connectDB();

// ROUTES
import authRoute from "./routes/auth.route.js";
import campaignRoute from "./routes/campaign.route.js";
import donationRoute from "./routes/donation.route.js";
import anomalyRoute from "./routes/anomaly.route.js";

const app = express();

// MIDDLEWARES
app.use(express.json());

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://crowdfunding-system.vercel.app",
  "https://crowdfunding-system-77e2g66i5-vishal-s-projects-87ed78d3.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// API ROUTES
app.use("/api/auth", authRoute);

app.use("/api/campaigns", campaignRoute);

app.use("/api/donations", donationRoute);

app.use("/api/anomalies", anomalyRoute);

// PORT
const PORT = process.env.PORT || 3000;

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
