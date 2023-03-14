const mongoose = require("mongoose");

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

module.exports = {
  User,
};
