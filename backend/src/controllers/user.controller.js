const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require('../utils/config');
const bcrypt = require("bcryptjs");

exports.getAUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: `No user with id: ${userId}` });
    } else {
      res.status(200).json({
        message: "Get a user successfully.",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.tokenLogin = async (req, res) => {
  try {
    const payload = {
      email: req.user.email,
      password: req.user.password,
    };
    jwt.sign(payload, config.secret, { expiresIn: '365d' }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({
        message: "Jwt Login Success.",
        token: `JWT ${token}`,
        user: req.user,
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find({
      email: {
        $ne: 'commune@gmail.com'
      }
    });
    res.status(200).json({
      message: "Get all users successfully.",
      users: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getAllDevelopers = async (req, res) => {
  try {
    const user = await UserModel.find({
      role: {
        $in: ['Developer']
      }
    });
    res.status(200).json({
      message: "Get all users successfully.",
      users: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getAllPms = async (req, res) => {
  try {
    const user = await UserModel.find({
      role: {
        $in: ['Project Manager']
      }
    });
    res.status(200).json({
      message: "Get all users successfully.",
      users: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getAllAdmins = async (req, res) => {
  try {
    const user = await UserModel.find({
      role: {
        $in: ['Administrator']
      },
      email: {
        $ne: 'commune@gmail.com'
      }
    });
    res.status(200).json({
      message: "Get all users successfully.",
      users: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: `User does not exist` });
  }
  if (user.role.length === 0) {
    return res.status(401).json({ msg: `User not allowed` });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(500).json({ msg: "In correct password" });
  const payload = { email: user.email, password: user.password };
  jwt.sign(payload, config.secret, { expiresIn: "365d" }, (err, token) => {
    if (err) {
      throw err;
    }
    res.json({
      message: "Jwt Login Success.",
      token: `JWT ${token}`,
      user: user,
    });
  });
};
exports.createAUser = async (req, res) => {
  const { email, password, discordName } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(409).json({
      msg: "user already exists.",
    });
  }
  else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({ email, discordName, password: hashedPassword });
    await newUser.save((err) => {
      if (err) {
        res.status(500).json({
          msg: err.message,
        });
      } else {
        res.status(201).json({
          message: "Create a new user successfully.",
        });
      }
    });
  }
};


exports.updateAUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const existing = await UserModel.find({ email: { $eq: req.body.email } });
    if (existing[0]._id != req.body._id) {
      return res.status(409).json({
        msg: `Another user registered as email ${req.body.email}`,
      });
    }
    const user = await UserModel.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({ msg: `User not registered` });
    } else {
      res.status(200).json({
        msg: `User with id: ${userId} updated successfully.`,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteAUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await UserModel.findByIdAndDelete(userId);
    return res.status(200).json({ msg: `user deleted with id: ${userId}`, user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

