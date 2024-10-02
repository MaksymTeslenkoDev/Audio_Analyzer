'use strict';

const { getFileName } = require('../src/utils');

module.exports = async function callServiceRoutes(fastify, opts) {
  fastify.route({
    method: 'POST',
    url: '/call',
    schema: {
      body: fastify.getSchema('schema:call:add:body'),
    },
    handler: async function addCallHandler(request, reply) {
      const { audio_url } = request.body;
      fastify.log.info(`Call service with audio url: ${audio_url}`);
      const fileName = getFileName(audio_url);
      const audio = await fetch(audio_url);

      let transcription = null;

      const buffer = []

      for await (let chunk of audio.body){
        buffer.push(chunk);
      }

      return { message: 'Call service', audio_url, transcription };
    },
  });
};
