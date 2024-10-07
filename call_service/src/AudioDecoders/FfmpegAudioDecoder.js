'use strict';
const ffmpeg = require('fluent-ffmpeg');
const { Mp3FfmpegAudio } = require('./AudioFileDecoderSettings/mp3Ffmpeg');
const { WavFfmpegAudio } = require('./AudioFileDecoderSettings/wavFfmpeg');
const { AudioDecoderFabrique } = require('./abstracts/AudioDecoderFabrique');
const { AudioDecoder } = require('./abstracts/AudioDecoder');

/**
 * FfmpegAudioDecoder class extends AudioDecoder to handle audio decoding
 * using FFMpeg with specific decoder file settings.
 *
 * @class FfmpegAudioDecoder
 * @extends {AudioDecoder}
 */
class FfmpegAudioDecoder extends AudioDecoder {
  /**
   * @param {AudioFileDecoderSettings} decoderFileSettings - The settings for the audio decoder.
   */
  constructor(decoderFileSettings) {
    super();
    this.decodingFileSettings = decoderFileSettings;
  }

  /**
   * Returns a readable stream of the decoded audio file using FFMpeg.
   *
   * @param {string} audioFile - The path to the audio file to be decoded.
   * @returns {stream.Readable} The decoded audio stream.
   * @throws {Error} Throws an error if the FFMpeg process fails.
   */
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

/**
 * FfmpegAudioDecoderFabrique class is responsible for creating FFMpeg-based
 * decoders for various audio formats. It extends the AudioDecoderFabrique class.
 *
 * @class FfmpegAudioDecoderFabrique
 * @extends {AudioDecoderFabrique}
 */
class FfmpegAudioDecoderFabrique extends AudioDecoderFabrique {

  /**
   * Returns an Ffmpeg-based audio decoder instance based on the provided format.
   *
   * @param {"mp3"|"wav"} format - The format of the audio, should be 'mp3' or 'wav'.
   * @returns {AudioDecoder} The appropriate FFMpeg-based decoder instance for the given format.
   * @throws {Error} Throws an error if the audio format is not allowed.
   */
  static getDecoder(format) {
    const fileDecoderSettings = this.getAudioDecoderSettings(format);
    if (!fileDecoderSettings)
      throw new Error(`${format} format audio file doesn't allowed`);

    return new FfmpegAudioDecoder(fileDecoderSettings);
  }

  /**
   * Retrieves the decoder settings based on the audio format.
   *
   * @param {"mp3"|"wav"} format - The format of the audio.
   * @returns {Mp3FfmpegAudio|WavFfmpegAudio|null} The settings object for the decoder, or null if the format is unsupported.
   */
  static getAudioDecoderSettings(format) {
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
