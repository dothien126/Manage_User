

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'RESTful API',
      version: '2.0.0',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        environment: 'Development server',
      },
    ],
  },
  apis: ['src/**/**.route.ts'],
};

module.exports = swaggerOptions;