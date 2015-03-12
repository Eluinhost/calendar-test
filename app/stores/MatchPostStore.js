'use strict';

import MatchPostFactory from './MatchPostFactory';
import {MarkdownDataLinkParser} from '../parsers';
import request from 'superagent';

var MatchPostGenerator = new MatchPostFactory(
  new MarkdownDataLinkParser('/matchpost'),
  ['EU', 'NA', 'AF', 'AN', 'AS', 'OC', 'SA' /* others */, 'US', 'CA', 'AU']
);

var MatchPostStore = {
  init: function(raw) {
    this.data =
      _(raw)
        .map((item) => item.data)
        .map(MatchPostGenerator.fromRedditPost, MatchPostGenerator)
        .without(null)
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
