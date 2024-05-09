const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModels');
const formController = require('../controllers/formController')
require('dotenv').config();
const mongoose = require('mongoose');


// Route to display the create contacts form
router.get('/create', formController.createContacts);

// Route to create a new contact
router.post('/create', async (req, res) => {
  try {
    // Ensure that the request body contains the necessary fields
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Connect to the MongoDB database
    await mongoose.connect(process.env.DATABASE_URI);

    // Create a new contact object
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    // Save the new contact to the database
    const savedContact = await newContact.save(); // Corrected the method name and added await

    // Log the ID of the saved contact
    console.log(`${savedContact._id} contact stored in DB`);

    // Respond with a success message
    res.status(201).json({ message: 'Contact created successfully', contact: savedContact });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error storing contact in DB:', error);
    res.status(500).json({ message: 'Failed to create contact', error: error.message });
  }
});

// Route to get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch a specific contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update a contact
router.put('/update/:id', async (req, res) => {
  const contactId = req.params.id; // Extract the contact ID from the URL
  const { firstName, lastName, email, favoriteColor, birthday } = req.body; // Extract updated contact data from request body

  try {
    // Find the contact by ID and update its information
    const updatedContact = await Contact.findByIdAndUpdate(contactId, {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    }, { new: true }); // Set { new: true } to return the updated document

    if (!updatedContact) {
      // If the contact with the specified ID is not found, return a 404 status code
      return res.status(404).send('Contact not found');
    }

    // If the contact is successfully updated, return a 200 status code
    res.status(200).send('Contact updated successfully');
  } catch (error) {
    // If an error occurs during the update process, return a 500 status code
    console.error('Error updating contact:', error);
    res.status(500).send('Failed to update contact');
  }
});


module.exports = router;