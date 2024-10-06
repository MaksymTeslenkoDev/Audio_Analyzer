class AudioFileDecoderSettings {
  constructor() {
    this.inputFormat = null;
    this.format = null;
    this.audioFrequency = null;
    this.audioChannels = null;
    this.audioCodec = null;
  }

  getFormatName() {
    return this.inputFormat;
  }
}

module.exports = { AudioFileDecoderSettings };
