'use strict';

const { URL } = require('node:url');

function getFileName(url) {
  const myURL = new URL(url);
  return myURL.pathname.split('/').pop();
}

function parseFileUrl(url) {
  const myURL = new URL(url);
  const fileName = myURL.pathname.split('/').pop();
  const format = fileName.split('.').pop();
  return {
    fileName,
    format,
  };
}

module.exports = { parseFileUrl };
