'use strict';

import Snuownd from 'snuownd';

var Parser = Snuownd.getParser();

/**
 * Creates a new link_attributes function that adds target="_blank" and then calls the wrapped version if it exists
 *
 * @param {Function} original
 * @returns {Function}
 */
var wrapLinkAttributes = function(original) {
  return function(out, link, options) {
    out.s += ' target="_blank"';

    // call the original if it exists
    if (original) original(out, link, options);
  }
};

/**
 * Creates a new callback function that wraps the original but modifies the link_attributes to add target=_blank
 *
 * @param {Function} original
 */
var wrapCallback = function(original) {
  return function(out, link, title, content, options) {
    // make sure the object exists
    if (!options) options = {};

    // add our own link attributes

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    options.link_attributes = wrapLinkAttributes(options.link_attributes);
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

    // call the original if provided
    if (original) original(out, link, title, content, options);
  }
};

Parser.callbacks.link = wrapCallback(Parser.callbacks.link);
Parser.callbacks.autolink = wrapCallback(Parser.callbacks.autolink);

module.exports = Parser;
