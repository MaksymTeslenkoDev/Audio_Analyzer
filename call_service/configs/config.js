const fp = require('fastify-plugin');
const fastifyEnv = require('@fastify/env');
module.exports = fp(
  async function configLoader(fastify, opts) {
    await fastify.register(fastifyEnv, {
      confKey: 'secrets',
      schema: fastify.getSchema('schema:dotenv'),
    });

    fastify.decorate('config', {
      mongo: {
        forceClose: true,
        url: fastify.secrets.MONGO_URL,
      },
      server: {
        host: fastify.secrets.HOST,
        port: fastify.secrets.PORT,
      },
      path: {
        app: process.cwd(),
        audio: 'asssets/audio',
      },
    });
  },
  {
    name: 'application-config',
  },
);
