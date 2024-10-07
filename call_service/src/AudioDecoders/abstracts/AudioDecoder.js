'use strict';

/**
 * AudioDecoder class serves as a base class for decoding audio files.
 *
 * @class AudioDecoder
 */
class AudioDecoder {
  /**
   * This method should be implemented by subclasses to return a readable stream
   * of the decoded audio file.
   *
   * @param {string} audioFile - The path to the audio file to be decoded.
   * @returns {stream.Readable} The decoded audio stream.
   */
  getFileDecodingStream(audioFile) {
    throw new Error('Method not implemented.');
  }
}
module.exports = { AudioDecoder };
