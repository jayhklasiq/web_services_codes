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

async function updateOneContact(id, contactSchema) {
  const { database, collection } = await connectToMongoDB();
  return await collection.replaceOne({ _id: new ObjectId(id) }, contactSchema);
}

module.exports = { createContact, getContactById, getAllContacts, deleteOneContact, updateOneContact};
