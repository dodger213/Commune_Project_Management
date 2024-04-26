const UserModel = require("../models/user.model");

exports.getAUser = async (req, res) => {
  try {
    const { id: pubkey } = req.params;
    const user = await UserModel.findOne({ pubkey: pubkey });

    if (!user) {
      return res.status(404).json({ msg: `No user with wallet address: ${pubkey}` });
    } else {
      res.status(200).json({
        message: "Get a user successfully.",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAUser = async (req, res) => {
  const user = await UserModel.findOne({ pubkey: req.body.payload.pubkey }, "");
  if (user) {
    await UserModel.updateOne({ pubkey: req.body.payload.pubkey },req.body.payload );
    res.status(201).json({
      message: "Update the user successfully.",
    });
  }
  else {
    console.log(req.body.payload);
    const newUser = new UserModel(req.body.payload);
    await newUser.save((err) => {
      if (err) {
        res.status(500).json({
          message: err.message,
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
    const user = await UserModel.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({ msg: `No user with id: ${userId}` });
    } else {
      res.status(200).json({
        msg: `User with id: ${userId} updated successfully.`,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

