const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger-output.json'; // Output file for the generated documentation

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API Descriptions',
    version: '1.0.1',
  },
  host: 'wsev.onrender.com/contacts',
  schemes: ['https'],
};

const endpointsFiles = ['./routes/contacts.js']; // Path to your routes files

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // After documentation is generated, you can start your server
  require('./server');
});
