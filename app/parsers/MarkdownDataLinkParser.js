'use strict';

import _ from 'lodash';

class MarkdownDataLinkParser {
  /**
   * Create a new data link parser.
   *
   * Parses markdown links of the format [.*](address). Data must be valid JSON to be counted
   *
   * @param {string} address - the address of the links to check for
   */
  constructor(address) {
    this._regexString = MarkdownDataLinkParser.buildRegexString(address);
  }

  /**
   * Builds a regex string for matching a data link for use in new RegExp.
   *
   * @param {string} address
   * @returns {string}
   */
  static buildRegexString(address) {
    /*
     * Simple regex for caputring a markdown link in the format [data](link)
     *
     * $1 = data
     *
     * \[
     *    ([^\[\]])   // anything except actual [] characters
     * \]
     * \(address\)
     */
    return '\\[([^\\[\\]]+)\\]\\(' + address + '\\)';
  }

  /**
   * Parses a body of text for data links are returns an array of all the data objects found
   *
   * @param {string} text - the text to search through
   * @returns {Array} a list of all of the data objects found inside the links
   */
  parse(text) {
    var regex = new RegExp(this._regexString, 'gi');

    var matches = [];

    do {
      let match = regex.exec(text);

      if (_.isNull(match)) break;

      // push the captured data
      try {
        matches.push(JSON.parse(match[1]));
      } catch (err) {
        // don't include if it wasn't readable as JSON
      }
    } while (true);

    return matches;
  }
}

module.exports = MarkdownDataLinkParser;
