'use strict';

const fp = require('fastify-plugin');
const schemas = require('./schemas/loader');
const { parseFileUrl } = require('../src/utils');

module.exports = fp(async function callAutoHooks(fastify, opts) {
  fastify.register(schemas);

  fastify.addHook('preHandler', async (request, reply) => {
    if (request.body.audio_url) {
      const { fileName, format } = parseFileUrl(request.body.audio_url);
      request.fileName = fileName;
      request.format = format;
    }
  });
});
