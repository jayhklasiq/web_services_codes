const express = require('express');
const mongoose = require('mongoose')
const connectDB = require('./models/config')
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = 3000;

//Connect to MongoDB
connectDB();


// Define a route
app.get('/', (req, res) => {
  const name = 'Timileyin Olaoye';
  res.send(`${name}`);
});



// contacts route at /contacts path
app.use('/contacts', contactsRouter);


//Verify if mongodb is connected to the application
mongoose.connection.once('open', () => {
  console.log('Server is connected to MongoDB');

  // contacts route at /contacts path
  app.use('/contacts', contactsRouter);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
