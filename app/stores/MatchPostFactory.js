'use strict';

import Immutable from 'immutable';
import moment from 'moment';
import he from 'he';

const POST_TITLE_REGEX = /^(\w+ \d+ \d+:\d+)\s*(?:UTC|UCT)?\s*\[?(\w*)\]?[ -]+(.*)$/i;
const IP_V4_REGEX = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\:\d{1,5})?/g;

class MatchPostFactory {
  /**
   * @param {MarkdownDataLinkParser} dataLinkParser
   */
  constructor(dataLinkParser, regions) {
    this._dataLinkParser = dataLinkParser;
    this._regions = regions;
  }

  _parseFromLink(content) {
    var starts;
    var title;
    var region;
    var address;
    var opens;

    var data = this._dataLinkParser.parse(content);

    // no links found
    if (!data.length) return;

    // grab the first one
    var link = data[0];

    // momentify the dates
    if (link.starts) starts = moment.utc(link.starts);
    if (link.opens) opens = moment.utc(link.opens);

    // if they're not valid, remove them
    if (!link.starts.isValid()) starts = undefined;
    if (!link.opens.isValid()) opens = undefined;

    // only allow the correct regions
    if (_.includes(this._regions, link.region)) region = link.region;

    // set the title and address
    title = link.title;
    address = link.address;

    return {
      title,
      region,
      address,
      opens,
      starts
    };
  }

  _parseFromPost(raw) {
    var starts;
    var title;
    var region;
    var address;

    // check the title matches our expectations
    var matches = POST_TITLE_REGEX.exec(raw.title);

    // post isnt formatted correctly, cannot parse it
    if (!matches) return;

    // attempt to parse the start date from the post title
    starts = moment.utc(matches[1], 'MMM DD HH:mm', 'en');

    if (starts.isValid()) {
      // sanity check the start time due to year not being included
      if (starts.diff(moment.utc(), 'months') < -6) {
        starts.add(1, 'years');
      }
    } else {
      // RIP
      starts = undefined;
    }

    // optional group
    region = matches[2];

    if (!_.includes(this._regions, region)) region = undefined;

    title = matches[3];

    // basic IP checking for parsed links
    // this will only work for IPv4 addresses
    // and will only use the first one found
    var ipcheck = IP_V4_REGEX.exec(raw.selftext);

    if (ipcheck) {
      address = ipcheck[1];

      // don't show the default port even if it's supplied
      if (ipcheck[2] && ipcheck[2] !== ':25565') {
        address += ipcheck[2];
      }
    }

    return {
      starts,
      title,
      region,
      address
    }
  }

  fromRedditPost(raw, pivotTime) {
    var matchPost = {
      id: raw.id,
      title: raw.title,
      content: raw.selftext,
      author: raw.author,
      permalink: 'https://reddit.com' + raw.permalink,
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      posted: moment(raw.created_utc, 'X')
      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    };

    var linkData = this._dataLinkParser.parse(raw.selftext);
    var postData = this._parseFromPost(raw);

    var finalForm = _.extend(matchPost, postData, linkData);

    // fix html encoded entities breaking in post titles
    finalForm.title = he.decode(finalForm.title, {
      isAttributeValue: true
    });

    return Immutable.Map(matchPost);
  }
}

module.exports = MatchPostFactory;
