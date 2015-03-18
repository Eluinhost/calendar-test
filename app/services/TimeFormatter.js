'use strict';

import IntlRelativeFormat from 'intl-relativeformat';

if (!global.Intl) {
  global.Intl = require('intl'); // polyfill for `Intl`
}

module.exports = new IntlRelativeFormat('en');
