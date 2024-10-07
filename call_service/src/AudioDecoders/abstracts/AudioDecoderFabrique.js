'use strict';

/**
 * AudioDecoderFabrique class is responsible for providing the appropriate decoder 
 * based on the provided audio format.
 * 
 * @class AudioDecoderFabrique
 */
class AudioDecoderFabrique {
  /**
   * Returns the decoder instance based on the provided format.
   * 
   * @param {AudioFormat} format - The format of the audio, should be one of 'wav' or 'mp3'.
   * @returns {Object} The appropriate decoder instance for the given format.
   */
  getDecoder(format) {}
}

module.exports = { AudioDecoderFabrique };
