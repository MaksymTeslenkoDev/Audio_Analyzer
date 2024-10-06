'use strict';
const { AudioDecoderFabrique } = require('../abstracts/AudioDecoderFabrique');
const { Mp3FfmpegAudio } = require('../AudioFileDecoderSettings/mp3Ffmpeg');
const { WavFfmpegAudio } = require('../AudioFileDecoderSettings/wavFfmpeg');
const { FfmpegAudioDecoder } = require('../FfmpegAudioDecoder');

class FfmpegAudioDecoderFabrique extends AudioDecoderFabrique {
  getDecoder(format) {
    const fileDecoderSettings = this.getAudioDecoderSettings(format);
    if (!fileDecoderSettings)
      throw new Error(`${format} format audio file doesn't allowed`);

    return new FfmpegAudioDecoder(fileDecoderSettings);
  }

  getAudioDecoderSettings(format) {
    switch (format) {
      case 'mp3':
        return new Mp3FfmpegAudio();
      case 'wav':
        return new WavFfmpegAudio();
      default:
        return null;
    }
  }
}
module.exports = FfmpegAudioDecoderFabrique;
