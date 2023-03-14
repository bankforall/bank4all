// Database
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const session = require("express-session");
const auth_middleware = require("./middleware/auth");

app.set("trust proxy", 1); // trust first proxy
var sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));
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
  password: String,
  fullName: {
    type: String,
    require: true,
  },
  email: {
    require: true,
    type: String,
    unique: true,
  },
  phoneNumber: {
    require: true,
    type: String,
    unique: true,
  },
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
  let find = { phoneNumber: username };
  if (username.indexOf("@") > 0) {
    find = { email: username };
  }
  try {
    const user = await User.findOne(find);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({
        message: "Authentication successful",
      });
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/signUp", async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;
  try {
    const user = new User({
      password: bcrypt.hashSync(password, 10),
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      balance: 0,
      microfinanceBalance: 0,
      peerShareBalance: 0,
      peerShareDetails: [],
    });
    await user.save();
    req.session.user = user;
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({
        message: "มีข้อมูลซ้ำกันในระบบ",
        data: err.keyValue,
      });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

app.get("/balanceSummary", auth_middleware, async (req, res) => {
  try {
    // * ดึงแยก user โดยใช้ _id แทน username
    const user = await User.findById(req.session.user._id);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      const user2obj = user.toObject();
      res.status(200).json({
        balance: user2obj.balance,
        microfinanceBalance: user2obj.microfinanceBalance,
        peerShareBalance: user2obj.peerShareBalance,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/addMoney", auth_middleware, (req, res) => {
  const { amount } = req.body;
  // * เอา username ออก ยืนยันผ่าน session แทน
  // Add money logic
});

app.post("/withdrawn", auth_middleware, (req, res) => {
  const { amount } = req.body;
  // * เอา username ออก ยืนยันผ่าน session แทน
  // Withdraw money logic
});

app.get("/peerShareSummary", auth_middleware, (req, res) => {
  // * เอา username ออก ยืนยันผ่าน session แทน
  // Peer share summary logic
});

app.get("/getAllpeerShareDetail", auth_middleware, (req, res) => {
  // * เอา username ออก ยืนยันผ่าน session แทน
  // Get all peer share detail logic
});

// Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
