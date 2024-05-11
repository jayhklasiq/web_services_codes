const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const connectDB = require('./models/config')
const contactsRouter = require('./routes/contacts');
const homeRoute = require('./routes/index')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Set the view engine to EJS & set it to use EJS layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set("layout", "./layout/layout")

// Parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to MongoDB
connectDB();


// Define Routes
//homepage route
app.use('/', homeRoute);
// contacts route at /contacts path
app.use('/contacts', contactsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
