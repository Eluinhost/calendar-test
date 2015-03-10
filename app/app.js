'use strict';
require('semantic-ui-css/semantic.min.css');

var React = require('react/addons');
var Immutable = require('immutable');
var _ = require('lodash');
var MatchPostListing = require('./components/MatchPostListing');

var data = Immutable.List(_.range(100));

React.render(
  <div className="ui page grid">
    <div className="ui column">
      <MatchPostListing data={data} />
    </div>
  </div>
  , document.getElementById('page'));
