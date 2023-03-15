const mongoose = require("mongoose");

// ? ยังไม่เข้าใจ concept
// TODO: แก้ไขส่วนนี้
const peerShareDetails = new mongoose.Schema({
  memberNumber: Number,
  paymentAmount: Number,
  creditScore: Number,
  joinable: Boolean,
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
  // ? แยก peerShareDetails ออกเป็นอีก collection เวลาดึงข้อมูลค่อย aggregate จากตัว user_id หรือ peerShareDetails._id เอา
  //   peerShareDetails: [
  //     {
  //       memberNumber: Number,
  //       paymentAmount: Number,
  //       creditScore: Number,
  //       joinable: Boolean,
  //     },
  //   ],
});

const User = mongoose.model("User", userSchema);
const PeerShareDetails = mongoose.model("PeerShareDetails", peerShareDetails);

module.exports = {
  User,
  PeerShareDetails,
};
