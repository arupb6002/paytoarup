const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: "rzp_live_*****",
  key_secret: "Lucth8beABQd*****"
});

// TEMP STORAGE (real me DB use karo)
let payments = {};

// 🔹 CHECK STATUS
app.get("/check", (req, res) => {
  let id = req.query.id;

  if (payments[id]) {
    res.json({
      status: "paid",
      payment_id: payments[id]
    });
  } else {
    res.json({ status: "pending" });
  }
});

// 🔹 WEBHOOK
app.post("/webhook", (req