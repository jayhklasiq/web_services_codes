const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModels');
const formController = require('../controllers/formController');
const homeController = require('../controllers/homeController');
require('dotenv').config();
const { ObjectId } = require('bson');

// Route to display the create contacts form
router.get('/create', formController.createContacts);

// Route to create a new contact
router.post('/create', async (req, res) => {
  try {

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const newContact = await Contact.createContact({ firstName, lastName, email, favoriteColor, birthday })

    console.log(`${newContact.insertedId} stored in DB`);

    res.status(201).json({ message: 'Contact created successfully', contact: newContact });
  } catch (err) {

    console.error('Error storing contact in DB:', err);

    res.status(500).json({ message: 'Failed to create contact', error: err.message });
  }
});

// // GET route to fetch contact details and populate the form
router.get('/update/:id', formController.updateContacts, async (req, res) => {
  const contactId = req.params.id; // Extract the contact ID from the URL

  try {
    const contact = Contact.getContactById(contactId)
    if (!contact) {
      // If the contact with the specified ID is not found, return a 404 status code
      return res.status(404).send('Contact not found');
    }
    // Render the HTML form with the contact data populated
    res.render('update-contact-form', { contact });
  } catch (err) {
    // If an error occurs during the retrieval process, return a 500 status code
    console.err('Error fetching contact details:', err);
    res.status(500).send('Failed to fetch contact details');
  }
});

// PUT route to update a contact
router.put('/update/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).send('Invalid contact ID');
    }

    // Fetch the existing contact from the database
    const existingContact = await Contact.getContactById(contactId);
    if (!existingContact) {
      return res.status(404).send('Contact not found');
    }
    // Update the contact fields
    await Contact.updateOneContact(contactId, { firstName, lastName, email, favoriteColor, birthday });
    console.log(`${contactId} updated successfully`);

    res.status(204).send();
  } catch (error) {
    // If an error occurs during the update process, return a 500 status code
    console.error('Error updating contact:', error);
    res.status(500).send('Failed to update contact');
  }
});

//DELETE route to delete a contact
router.delete('/delete/:id', async (req, res) => {
  try {
    const contact = await Contact.getContactById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await Contact.deleteOneContact(req.params.id);

    res.status(200).json({ message: `${contact._id} deleted successfully` });

    console.log(`Contact deleted succesfully.`)
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
});

// Route to get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch a specific contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;