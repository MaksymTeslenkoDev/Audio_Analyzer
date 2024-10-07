'use strict';

const { getFileName } = require('../src/utils');
const ffmpeg = require('fluent-ffmpeg');

const sample_rate = 16000;
module.exports = async function callServiceRoutes(fastify, opts) {
  fastify.route({
    method: 'POST',
    url: '/call',
    schema: {
      body: fastify.getSchema('schema:call:add:body'),
    },
    handler: async function addCallHandler(request, reply) {
      const { audio_url } = request.body;
      const { fileName, format } = request;
      fastify.log.info(`Call service with audio url: ${audio_url}`);

      const rec = fastify.vosk.recognize(sample_rate);
      rec.setMaxAlternatives(0);
      rec.setWords(true);
      rec.setPartialWords(true);

      const audioDecoderStream = await fastify.ffmpeg.decodeAudio(
        format,
        audio_url,
      );

      const transcription = await transcribeAudio(audioDecoderStream, rec);

      return { fileName, transcription };
    },
  });
};

async function transcribeAudio(audioDecoderStream, recognizer) {
  try {
    for await (let chunk of audioDecoderStream) {
      recognizer.acceptWaveform(chunk);
    }
    const result = recognizer.finalResult();
    recognizer.free();
    const transcription = result.text;
    return transcription;
  } catch (err) {
    recognizer.free();
    throw err;
  }
}
