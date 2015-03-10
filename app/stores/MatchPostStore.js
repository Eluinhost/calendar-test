'use strict';

var MatchPostFactory = require('../MatchPostFactory');

var posts = Immutable.Set();

var MatchPostStore = {
  init: function(raw) {
    posts = Immutable.Set(raw.map(MatchPostFactory.fromRedditPost));

    // TODO triggers
  }
};

module.exports = MatchPostStore;
