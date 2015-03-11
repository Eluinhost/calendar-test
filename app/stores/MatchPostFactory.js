'use strict';

import Immutable from 'immutable';
import moment from 'moment';

const POST_TITLE_REGEX = /^(\w+ \d+ \d+:\d+)\s*(?:UTC|UCT)?\s*\[?(\w*)\]?[ -]+(.*)$/i;
const IP_V4_REGEX = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\:\d{1,5})?/g;

class MatchPostFactory {
  /**
   * @param {MarkdownDataLinkParser} dataLinkParser
   */
  constructor(dataLinkParser) {
    this._dataLinkParser = dataLinkParser;
  }

  fromRedditPost(raw, pivotTime) {
    var data = this._dataLinkParser.parse(raw.selftext);

    var matchPost = {
      id: raw.id,
      title: raw.title,
      content: raw.selftext,
      author: raw.author,
      permalink: raw.permalink,
      posted: moment(element.created_utc, 'X')
    };

    if (data.length) {
      // no more parsing required, just assign the values from the first data link found
      _.assign(matchPost, data[0]);
    } else {
      // we fallback to parsing from the post itself

      // check the title matches our expectations
      var matches = POST_TITLE_REGEX.exec(matchPost.title);

      // post isnt formatted correctly, cannot parse it
      if (!matches) return;

      // attempt to parse the date from the post title
      var startTime = moment.utc(matches[1], 'MMM DD HH:mm', 'en');

      if (startTime.isValid()) {
        // sanity check the start time due to year not being included
        if (startTime.diff(pivotTime, 'months') < -6) {
          startTime.add(1, 'years');
        }

        // set the valid time
        matchPost.starts = startTime;
      }

      if (matches[2]) matchPost.region = matches[2];

      matchPost.title = matches[3];

      // basic IP checking for parsed links
      // this will only work for IPv4 addresses
      // and will only use the first one found
      var ipcheck = IP_V4_REGEX.exec(matchPost.content);

      if (ipcheck) {
        matchPost.address = ipcheck[1];

        // don't show the default port even if it's supplied
        if (ipcheck[2] && ipcheck[2] !== ':25565') {
          matchPost.address += ipcheck[2];
        }
      }
    }

    // fix html encoded entities breaking in post titles
    matchPost.title = he.decode(matchPost.title, {
      isAttributeValue: true
    });

    return Immutable.Map(matchPost);
  }
}

module.exports = MatchPostFactory;
