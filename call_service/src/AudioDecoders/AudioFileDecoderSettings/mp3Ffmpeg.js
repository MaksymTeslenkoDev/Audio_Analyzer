'use srtrict';
const { AudioFileDecoderSettings } = require('../abstracts/AudioFileSettings');
const { ffmpegDecoderAudioSettings } = require('../constants');

class Mp3FfmpegAudio extends AudioFileDecoderSettings {
  constructor() {
    super();
    this.inputFormat = 'mp3';
    this.audioFrequency = ffmpegDecoderAudioSettings.AUDIO_FREQUENCY;
    this.format = ffmpegDecoderAudioSettings.AUDIO_DECODER_FORMAT;
    this.audioChannels = ffmpegDecoderAudioSettings.AUDIO_CHANNELS_AMOUNT;
    this.audioCodec = ffmpegDecoderAudioSettings.AUDIO_CODEC;
  }
}

module.exports = { Mp3FfmpegAudio };
