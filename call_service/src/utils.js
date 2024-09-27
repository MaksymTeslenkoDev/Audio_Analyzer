'use strict';

const { URL } = require('node:url');

function getFileName(url) {
  const myURL = new URL(url);
  return myURL.pathname.split('/').pop();
}

module.exports = { getFileName };
