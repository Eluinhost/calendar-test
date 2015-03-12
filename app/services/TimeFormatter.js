'use strict';

var IntlRelativeFormat = require('intl-relativeformat');

if (!global.Intl) {
  global.Intl = require('intl'); // polyfill for `Intl`
}

module.exports = new IntlRelativeFormat('en');
