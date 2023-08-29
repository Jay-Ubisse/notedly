// Require the mongose library
const mongoose = require('mongoose');
require('dotenv').config();

const connectionURL = process.env.DB_HOST;

try {
    mongoose.connect(`${connectionURL}`);
  } catch (error) {
    handleError(error);
  }
