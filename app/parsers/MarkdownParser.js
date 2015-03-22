'use strict';

import Snuownd from 'snuownd';
import {dataLinkAddress} from '../config';

var Parser = Snuownd.getParser();

/**
 * Creates a new callback function that wraps the original but modifies the options to add target=_blank
 *
 * @param {Function} original
 */
var wrapCallback = function(original) {
  return function(out, link, title, content, options) {
    // make sure the object exists
    if (!options) options = {};

    // don't render the link at all if it's a data link
    if (link.s === dataLinkAddress) {
      out = '';
      return 1;
    }

    // add target to the options
    options.target = '_blank';

    // call the original
    return original(out, link, title, content, options);
  }
};

Parser.callbacks.link = wrapCallback(Parser.callbacks.link);
Parser.callbacks.autolink = wrapCallback(Parser.callbacks.autolink);

module.exports = Parser;
