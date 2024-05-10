require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('../models/contactModels');

// Routes to create form view
async function createContacts(req, res, next) {
  res.render("forms/createForms",
    {
      title: "Create Contacts",
      errors: null
    }
  )
}

// Routes to update form view
async function updateContacts(req, res, next) {
  await mongoose.connect(process.env.DATABASE_URI);
  const contact = await Contact.getContactById(req.params.id);
  res.render("forms/updateForms",
    {
      contact: contact,
      title: "Update Contacts",
      errors: null
    }
  )
}

module.exports = { createContacts, updateContacts }