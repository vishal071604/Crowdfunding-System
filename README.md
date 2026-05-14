# AI-Powered Crowdfunding Platform 🚀

An advanced MERN Stack crowdfunding platform integrated with:

- AI/ML Fraud Detection
- Blockchain-style Transaction Hashing
- JWT Authentication
- Campaign Management
- Donation Tracking
- Admin Anomaly Monitoring

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Multer

## AI/ML
- Python
- Flask
- Scikit-learn
- Pandas
- NumPy
- Joblib

## Blockchain-style Tracking
- SHA256 Transaction Hashing using Node.js Crypto

---

# Features

## User Features
- User Registration & Login
- JWT Cookie Authentication
- Create Campaigns
- View Campaigns
- Donate to Campaigns
- Track Donations
- View Donation History

## AI Fraud Detection
- Detect suspicious donations
- Fraud probability scoring
- ML-based anomaly detection

## Blockchain-style Features
- Unique transaction hash generation
- SHA256 transaction security

## Admin Features
- View suspicious donations
- View anomaly reports
- Fraud severity monitoring

---

# Project Structure

```bash
Project/
│
├── Frontend/
│
├── Backend/
│
└── ML/
```

---

# Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd Backend

npm install

npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

---

# ML Setup

## Install Packages

```bash
pip install flask flask-cors pandas scikit-learn numpy joblib
```

## Train Model

```bash
python train_model.py
```

## Run Flask API

```bash
python app.py
```

ML API runs on:

```bash
http://127.0.0.1:5000
```

---

# ML Fraud Detection Flow

```text
Donation Request
        ↓
Express Backend
        ↓
Flask ML API
        ↓
ML Prediction
        ↓
Safe / Suspicious
        ↓
Store Anomaly Report
```

---

# Blockchain-style Transaction Flow

```text
Donation
    ↓
Generate SHA256 Hash
    ↓
Store Unique Transaction Hash
```

---

# Environment Variables

## Backend `.env`

```env
PORT=3000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY
```

---

# API Routes

## Auth Routes

```bash
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

## Campaign Routes

```bash
POST /api/campaign/create
GET /api/campaign
GET /api/campaign/:id
```

## Donation Routes

```bash
POST /api/donation/:campaignId
GET /api/donation/my
```

## Anomaly Routes

```bash
GET /api/anomaly
```

---

# AI Model Features

ML model uses:
- Donation Amount
- Campaign Target
- Raised Amount
- Donation Count
- User Donation Frequency

to predict:
- Safe Donation
- Suspicious Donation

---

# Future Improvements

- Real Blockchain Integration
- Payment Gateway
- Live Analytics Dashboard
- Advanced AI Fraud Detection
- Email Notifications
- Role-based Access Control

---

# Author

## Vishal S Kalawad

Full Stack MERN Developer
AI & ML Enthusiast
