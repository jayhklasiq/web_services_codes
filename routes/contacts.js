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

// GET route to fetch contact details and populate the form
router.get('/update/:id', formController.updateContacts, async (req, res) => {
  const contactId = req.params.id; // Extract the contact ID from the URL

  try {
    // Fetch the contact details from the database based on the contact ID
    const contact = await Contact.findById(contactId);

    if (!contact) {
      // If the contact with the specified ID is not found, return a 404 status code
      return res.status(404).send('Contact not found');
    }

    // Render the HTML form with the contact data populated
    res.render('update-contact-form', { contact });
  } catch (error) {
    // If an error occurs during the retrieval process, return a 500 status code
    console.error('Error fetching contact details:', error);
    res.status(500).send('Failed to fetch contact details');
  }
});

// PUT route to update a contact
router.put('/update/:id', async (req, res) => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.DATABASE_URI);

    const contactId = req.params.id;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Fetch the existing contact from the database
    const existingContact = await Contact.findById(contactId);
    console.log(existingContact);
    if (!existingContact) {
      return res.status(404).send('Contact not found');
    }
    // Update the contact fields
    existingContact.firstName = firstName;
    existingContact.lastName = lastName;
    existingContact.email = email;
    existingContact.favoriteColor = favoriteColor;
    existingContact.birthday = birthday;

    // Save the updated contact
    const updatedContact = Contact.findByIdAndUpdate(
      contactId,
      existingContact,
      { new: true }
    )

    // If the contact is successfully updated, return a 204 status code
    res.status(204).send('Contact updated successfully');
  } catch (error) {
    // If an error occurs during the update process, return a 500 status code
    console.error('Error updating contact:', error);
    res.status(500).send('Failed to update contact');
  }
});

//DELETE route to delete a contact
router.delete('/delete/:id', async (req, res) => {
  try {
    // Find the contact to be deleted
    const contact = await Contact.findById(req.params.id);
    // If the contact is not found, return a 404 status code
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    // Delete the contact
    const delContact = await Contact.findByIdAndDelete(req.params.id);
    // Return a 204 status code if the contact is successfully deleted
    res.status(204).json({ message: 'Contact deleted successfully' });
    console.log(`${delContact._id} deleted succesfully.`)
  } catch (error) {
    // If an error occurs during the deletion process, return a 500 status code
    res.status(500).json({ message: error.message });
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

module.exports = router;