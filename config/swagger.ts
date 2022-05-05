
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Manage User',
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

export default swaggerOptions;