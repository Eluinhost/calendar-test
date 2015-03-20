'use strict';

import MatchPostFactory from './MatchPostFactory';
import {MarkdownDataLinkParser} from '../parsers';
import request from 'superagent';
import moment from 'moment';
import {dataLinkAddress} from '../config';

var MatchPostGenerator = new MatchPostFactory(
  new MarkdownDataLinkParser(dataLinkAddress),
  ['EU', 'NA', 'AF', 'AN', 'AS', 'OC', 'SA', 'US', 'CA', 'AU']
);

var MatchPostStore = {
  init: function(raw) {
    this.data =
      _(raw)
        .map((item) => item.data)
        .map(MatchPostGenerator.fromRedditPost, MatchPostGenerator)
        .without(null)
        .filter((item) => {
          // allow unparsed times
          if (!item.get('starts')) return true;

          // filter out past games
          return item.get('starts').diff(moment.utc()) > 0
        })
        // sort by start time and move unparsed to the end of the list
        .sortBy((item) => item.get('starts') ? item.get('starts') : Infinity)
        .indexBy((item) => item.get('id'))
        .value();

    this.listeners.forEach((cb) => cb(this.data));
    // TODO use flux instead of listener system
    // TODO don't just replace the map
    // TODO immutable map
  },
  data: [],
  listeners: [],
  listen: function(callback) {
    callback(this.data);
    this.listeners.push(callback);
  },
  refetch: function() {
    request
      .get('https://www.reddit.com/r/uhcmatches/search.json?q=flair%3AUpcoming_Match&restrict_sr=on&limit=100&sort=new')
      .set('Accept', 'application/json')
      .end((error, response) => this.init(response.body.data.children));
  }
};

setInterval(MatchPostStore.refetch.bind(MatchPostStore), 60000);
MatchPostStore.refetch();

module.exports = MatchPostStore;
