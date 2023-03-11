// Database
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to database");
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  fullName: String,
  email: String,
  phoneNumber: String,
  balance: Number,
  microfinanceBalance: Number,
  peerShareBalance: Number,
  peerShareDetails: [
    {
      memberNumber: Number,
      paymentAmount: Number,
      creditScore: Number,
      joinable: Boolean,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(express.json());

// Endpoints (continued)
app.post("/signIn", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else if (user.password !== password) {
      res.status(400).json({ message: "Invalid password" });
    } else {
      res.status(200).json({ message: "Authentication successful" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/signUp", async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;
  try {
    const user = new User({
      username: email,
      password: password,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      balance: 0,
      microfinanceBalance: 0,
      peerShareBalance: 0,
      peerShareDetails: [],
    });
    await user.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/balanceSummary", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(200).json({
        balance: user.balance,
        microfinanceBalance: user.microfinanceBalance,
        peerShareBalance: user.peerShareBalance,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/addMoney", (req, res) => {
  const { username, amount } = req.body;
  // Add money logic
});

app.post("/withdrawn", (req, res) => {
  const { username, amount } = req.body;
  // Withdraw money logic
});

app.get("/peerShareSummary", (req, res) => {
  const { username } = req.query;
  // Peer share summary logic
});

app.get("/getAllpeerShareDetail", (req, res) => {
  const { username } = req.query;
  // Get all peer share detail logic
});

// Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
