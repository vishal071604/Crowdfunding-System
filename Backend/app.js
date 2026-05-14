dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import campaignRoute from "./routes/campaign.route.js";
import donationRoute from "./routes/donation.route.js";
import anomalyRoutes from "./routes/anomaly.route.js";

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/campaigns", campaignRoute);
app.use("/api/donations", donationRoute);
app.use('/api/anomalies', anomalyRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
