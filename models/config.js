//this file contains all configuratiion and connection settings to MongoDB as well as its Schemas

const mongoose = require('mongoose');
require('dotenv').config(); //very important if you need "process.env.DATABASE_URI" to run

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: 'ContactsDB',
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error; // Throw the error to propagate it to the caller
  }
};

module.exports = connectDB 
