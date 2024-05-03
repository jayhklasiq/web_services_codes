//this file contains all configuratiion and connection settings to MongoDB as well as its Schemas

const mongoose = require('mongoose');
const Contact = require('./contactModels');
require('dotenv').config(); //very important if you need "process.env.DATABASE_URI" to run

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'ContactsDB',
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error; // Throw the error to propagate it to the caller
  }
};

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.DATABASE_URI).then(() => {
//   console.log("Connected to MongoDB Atlas... adding data to databse");

//   // Insert documents
//   const contacts = [
//     {
//       firstName: "James",
//       lastName: "Olaoye",
//       email: "o_james@gmail.com",
//       favoriteColor: "Blue",
//       birthday: new Date("1970-11-13")
//     },
//     {
//       firstName: "Erica",
//       lastName: "Serwaa",
//       email: "Serwaa.gg@gmail.com",
//       favoriteColor: "Black",
//       birthday: new Date("1993-02-14")
//     },
//     {
//       firstName: "Damiel",
//       lastName: "Amos",
//       email: "a.amosd@example.com",
//       favoriteColor: "Red",
//       birthday: new Date("2001-06-05")
//     }
//   ];

//   // Insert multiple documents
//   Contact.insertMany(contacts)
//     .then(docs => {
//       console.log("Documents inserted successfully:", docs);
//     })
//     .catch(err => {
//       console.error("Error inserting documents:", err);
//     })
//     .finally(() => {
//       // Close the connection after inserting documents
//       mongoose.disconnect();
//     });
// }).catch(err => {
//   console.error("Error connecting to MongoDB Atlas:", err);
// });

module.exports = connectDB 
