const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: [20, "name must be less than 20 characters"],
    trim: true,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
  },
  link: {
    type: String,
  },
  pubkey: {
    type: String,
    required: [true, "Must be provided pubkey"],
  },
  avatarFile: {
    type: String,
  },
  bannerFile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
