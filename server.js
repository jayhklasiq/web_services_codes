const express = require('express');
const app = express();
const PORT = 3000;

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define a route to return a name
app.get('/name', (req, res) => {
  const name = 'Timileyin Olaoye';
  res.send(`${name}`);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
