const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModels');
const formController = require('../controllers/formController');
require('dotenv').config();
const { ObjectId } = require('bson');



/**
 * @swagger
 * /contacts/create:
 *   get:
 *     summary: Display the create contacts form
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successfully rendered form
 */
// Route to display the create contacts form
router.get('/create', formController.createContacts);


/**
 * @swagger
 * /contacts/create:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       500:
 *         description: Failed to create contact
 */
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


/**
 * @swagger
 * /contacts/update/{id}:
 *   get:
 *     summary: Fetch contact details and populate the form
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact details fetched successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Failed to fetch contact details
 */
// GET route to fetch contact details and populate the form
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


/**
 * @swagger
 * /contacts/update/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       204:
 *         description: Contact updated successfully
 *       400:
 *         description: Invalid contact ID
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Failed to update contact
 */
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


/**
 * @swagger
 * /contacts/delete/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Failed to delete contact
 */
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


/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successfully retrieved contacts
 *       500:
 *         description: Failed to retrieve contacts
 */
// Route to get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Fetch a specific contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Successfully retrieved contact
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Failed to retrieve contact
 */
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