const mongoose = require('mongoose');
require('dotenv').config(); //very important if you need "process.env.DATABASE_URI" to run


const contactSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    favoriteColor: String,
    birthday: Date
  }
);


// Create a Mongoose model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;