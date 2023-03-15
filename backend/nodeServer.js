// Database
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const session = require("express-session");
const auth_middleware = require("./middleware/auth");
const { default: helmet } = require("helmet");
const { User } = require("./Models");
const jwt = require("jsonwebtoken");

var sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(
  cors({
    // origin ของ frontend
    origin: ["http://localhost:3001"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(helmet.hidePoweredBy());
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

// Middleware
app.use(express.json());

// TODO: ย้ายไปเก็บใน Crontrollers
const signInFunc = async (req, res, next) => {
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
      let resp_obj = {
        message: "Authentication successful",
      };
      if (req.url === "/signInJwt") {
        // * ถ้าเข้าสู่ระบบผ่าน signInJwt จะเป็นการขอ token แทน
        resp_obj.token = jwt.sign(
          { sub: user._id, _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN }
        );
      } else req.session.user = user;

      res.status(200).json(resp_obj);
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Endpoints (continued)
app.post("/signIn", signInFunc);
// ? ต้องทำ refresh token ด้วยหรือไม่?
app.post("/signInJwt", signInFunc);

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
    const user = await User.findById(req.user._id);
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
