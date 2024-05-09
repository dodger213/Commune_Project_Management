// external modules import
const mongoose = require("mongoose");
const UserModel = require('../models/user.model')
const bcrypt = require("bcryptjs");

const connectionString = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true, // for mongoose 6.x
        // useFindAndModify: false, // for mongoose 6.x
      })
      .then(async () => {
        console.log("Connected to MongoDB database successfully.");
        const admin = await UserModel.find({
          role: {
            $in: ['Administrator']
          }
        })
        if (admin.length === 0) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash('communemanager-fam', salt);
          const adminUser = new UserModel({
            email: 'commune@gmail.com',
            password: hashedPassword,
            discordName: 'commune',
            role: ['Administrator']
          })
          adminUser.save((err) => {
            if (err) {
              console.log("error creating admin");
            } else {
              console.log("Created a admin successfully.");
            }
          });
        } else {
          console.log("admin already exists.");
        }
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB: ", error.message);
      });
  } catch (error) {
    console.log("Database connection error: ", error.message);
  }
};

module.exports = connectDatabase;
