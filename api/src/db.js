// Require the mongose library
const mongoose = require('mongoose');
require('dotenv').config();

const connectionURL = process.env.DB_HOST;

const connectDB = async () => {
  try {
    await mongoose.connect(`${connectionURL}`).then(() => {
      console.log("Connected to MongoDB successfully");
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectDB };
