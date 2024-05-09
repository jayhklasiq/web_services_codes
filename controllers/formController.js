require('dotenv').config();

async function createContacts(req, res, next) {
  res.render("forms/forms",
    {
      title: "Create Contacts",
      errors: null
    }
  )
}

async function updateContacts(req, res, next) {
  res.render("forms/updateForms",
    {
      title: "Create Contacts",
      errors: null
    }
  )
}

module.exports = { createContacts, updateContacts }