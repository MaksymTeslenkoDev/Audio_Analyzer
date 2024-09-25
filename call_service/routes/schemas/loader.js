'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async function schemaLoaderPlugin(fastify, opts) {
  fastify.addSchema(require('./call-add-body.json'));
});
