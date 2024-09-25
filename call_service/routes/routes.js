'use strict';

module.exports = async function callServiceRoutes(fastify, opts) {
  fastify.route(
    {
      method: 'POST',
      url: '/call',
      schema: {
        body: fastify.getSchema('schema:call:add:body'),
      },
      handler: async function addCallHandler(request, reply) {
        const { audio_url } = request.body;
        return { message: 'Call service', audio_url };
      },
    },
  );
};
