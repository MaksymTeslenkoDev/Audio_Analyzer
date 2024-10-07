'use strict';

const ffmpegDecoderAudioSettings = {
  AUDIO_FREQUENCY: 16000,
  AUDIO_DECODER_FORMAT: 's16le',
  AUDIO_CHANNELS_AMOUNT: 1,
  AUDIO_CODEC: 'pcm_s16le',
};

/**
 * Enum for supported audio formats.
 * @enum {string}
 */
const AudioFormat = {
  WAV: 'wav',
  MP3: 'mp3',
};

module.exports = {
  ffmpegDecoderAudioSettings,
  AudioFormat
};
