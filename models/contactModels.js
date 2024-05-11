const { ObjectId } = require('mongodb');
const connectToMongoDB  = require('./config');

// Define the schema
const contactSchema = {
  firstName: 'string',
  lastName: 'string',
  email: 'string',
  favoriteColor: 'string',
  birthday: 'date'
};

async function createContact(contactSchema) {
  const { database, collection } = await connectToMongoDB();
  const result = await collection.insertOne(contactSchema);
  return result;
}

async function getContactById(id) {
  const { database, collection } = await connectToMongoDB();
  const result = await collection.findOne({ _id: new ObjectId(id) }); 
  return result;
}

async function getAllContacts() {
  const { database, collection } = await connectToMongoDB();
  const cursor = collection.find(); // Get the cursor
  const result = await cursor.toArray(); // Convert cursor to array
  return result;
}

async function deleteOneContact(id) {
  const { database, collection } = await connectToMongoDB();
  return await collection.deleteOne({ _id: new ObjectId(id) });
}


module.exports = { createContact, getContactById, getAllContacts, deleteOneContact};






// const mongoose = require('mongoose');
// require('dotenv').config(); //very important if you need "process.env.DATABASE_URI" to run


// const contactSchema = new mongoose.Schema(
//   {
//     firstName: String,
//     lastName: String,
//     email: String,
//     favoriteColor: String,
//     birthday: Date
//   }
// );


// // Create a Mongoose model
// const Contact = mongoose.model('Contact', contactSchema);

// module.exports = Contact;


//The above function uses Mongoose while the one below uses MongoDB directly

//Create a connection to MongoDB

