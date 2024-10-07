'use strict';

const fp = require('fastify-plugin');
const FfmpegAudioDecoder = require('../src/AudioDecoders/FfmpegAudioDecoder');

module.exports = fp(async function (fastify, opts) {
  /**
   *
   * @param {"wav"|"mp3"} format
   * @param { string } audio
   */
  async function decodeAudio(format, audio) {
    const ffmpegAudioDecoder = FfmpegAudioDecoder.getDecoder(format);
    return ffmpegAudioDecoder.getFileDecodingStream(audio);
  }

  fastify.decorate('ffmpeg', {
    decodeAudio,
  });
});
