const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School API',
      version: '1.0.0',
      description: 'API for managing and listing schools with geolocation support',
    },
    servers: [
      {
        url: 'http://localhost:9000', 
      },
    ],
  },
  apis: ['./routes/schoolRoutes*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
