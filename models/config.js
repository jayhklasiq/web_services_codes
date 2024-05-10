// //this file contains all configuratiion and connection settings to MongoDB as well as its Schemas
const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  const DATABASE_URI = process.env.DATABASE_URI;
  const mongoConnect = new MongoClient(DATABASE_URI);

  try {
    // Connect to the MongoDB server
    await mongoConnect.connect();
    console.log('Connected to MongoDB without Mongoose.');

    // Access the database
    const database = mongoConnect.db('ContactsDB');

    // Access a collection
    const collection = database.collection('contacts');

    // Return the database and collection objects
    return { database, collection };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to handle it outside
  }
}

module.exports = connectToMongoDB;



// const mongoose = require('mongoose');
// require('dotenv').config(); //very important if you need "process.env.DATABASE_URI" to run

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URI, {
//       dbName: 'ContactsDB',
//     });
//     console.log("Connected to MongoDB Atlas");
//   } catch (error) {
//     console.error("Error connecting to MongoDB Atlas:", error);
//     throw error; // Throw the error to propagate it to the caller
//   }
// };

// module.exports = connectDB
