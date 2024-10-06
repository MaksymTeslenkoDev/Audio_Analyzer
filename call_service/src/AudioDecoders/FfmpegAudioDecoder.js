'use strict';

const { AudioDecoder } = require('./abstracts/AudioDecoder');
const ffmpeg = require('fluent-ffmpeg');

class FfmpegAudioDecoder extends AudioDecoder {
  constructor(decoderFileSettings) {
    this.decodingFileSettings = decoderFileSettings;
  }

  getFileDecodingStream(audioFile) {
    const { inputFormat, format, audioFrequency, audioChannels, audioCodec } =
      this.decodingFileSettings;
    const ffmpegProcess = ffmpeg()
      .input(audioFile)
      .inputFormat(inputFormat)
      .format(format)
      .audioFrequency(audioFrequency)
      .audioChannels(audioChannels)
      .audioCodec(audioCodec)
      .on('error', (err) => {
        throw new Error(err.message);
      });
    return ffmpegProcess.pipe();
  }
}

module.exports = { FfmpegAudioDecoder };
