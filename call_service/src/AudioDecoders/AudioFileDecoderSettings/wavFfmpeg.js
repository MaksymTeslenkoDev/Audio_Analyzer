'use srtrict';
const { AudioFileDecoderSettings } = require('../abstracts/AudioFileSettings');
const { ffmpegDecoderAudioSettings } = require('../constants');

class WavFfmpegAudio extends AudioFileDecoderSettings {
  constructor() {
    super();
    this.inputFormat = 'wav';
    this.audioFrequency = ffmpegDecoderAudioSettings.AUDIO_FREQUENCY;
    this.format = ffmpegDecoderAudioSettings.AUDIO_DECODER_FORMAT;
    this.audioChannels = ffmpegDecoderAudioSettings.AUDIO_CHANNELS_AMOUNT;
    this.audioCodec = ffmpegDecoderAudioSettings.AUDIO_CODEC;
  }
}

module.exports = { WavFfmpegAudio };
