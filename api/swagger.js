// swagger.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist");

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';
const options = {
  customCssUrl: CSS_URL,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
    servers: [
      {
        url: 'https://booking-res.vercel.app/', // URL của server đã triển khai lên Vercel
      },
    ],
  },
  apis: ['./routes/routes.js'], // Đường dẫn tới file chứa các comment swagger
};




const swaggerSpec = swaggerJsDoc(options);


const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
