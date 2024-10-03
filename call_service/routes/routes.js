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
      fastify.log.info(`Call service with audio url: ${audio_url}`);
      const fileName = getFileName(audio_url);

      const rec = fastify.vosk.recognize(sample_rate);
      rec.setMaxAlternatives(0);
      rec.setWords(true);
      rec.setPartialWords(true);

      const transcription = await transcribeAudio({
        audio: audio_url,
        recognizer: rec,
        logger: fastify.log,
      });

      return { fileName, transcription };
    },
  });
};

async function transcribeAudio({ audio, recognizer, logger }) {
  const ffmpegProcess = ffmpeg()
    .input(audio)
    .inputFormat('wav')
    .format('s16le')
    .audioFrequency(sample_rate)
    .audioChannels(1)
    .audioCodec('pcm_s16le')
    .on('error', (err) => {
      logger.error(`FFmpeg error: ${err.message}`);
      recognizer.free();
      throw new Error(err.message);
    });

  try {
    const ffmpegStream = ffmpegProcess.pipe();

    for await (let chunk of ffmpegStream) {
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
