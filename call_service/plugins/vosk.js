// plugins/vosk.js

'use strict';

const fp = require('fastify-plugin');
const vosk = require('vosk');
const fs = require('fs');
const path = require('path');

module.exports = fp(
  async function voskPlugin(fastify, options) {
    const modelPath =
      options.modelPath ||
      path.join(__dirname, '../models/vosk-model-small-en-us-0.15');

    if (!fs.existsSync(modelPath)) {
      fastify.log.error(`Vosk model not found at ${modelPath}`);
      throw new Error('Vosk model not found');
    }

    vosk.setLogLevel(0);

    let model;
    try {
      model = new vosk.Model(modelPath);
      fastify.log.info('Vosk model loaded successfully');
    } catch (err) {
      fastify.log.error(`Failed to load Vosk model: ${err.message}`);
      throw err;
    }

    fastify.decorate('vosk', {
      model,
      recognize: (sampleRate) =>
        new vosk.Recognizer({
          model,
          sampleRate,
        }),
    });

    fastify.addHook('onClose', (instance, done) => {
      if (model) {
        model.free();
        fastify.log.info('Vosk model freed');
      }
      done();
    });
  },
  {
    name: 'fastify-vosk',
  },
);
