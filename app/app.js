'use strict';

import 'semantic-ui-css/semantic.min.css';

import React from 'react/addons';
import Immutable from 'immutable';
import _ from 'lodash';
import MatchPostListing from './components/MatchPostListing';

var data = Immutable.List(_.range(100));

React.render(
  <div className="ui page grid">
    <div className="ui column">
      <MatchPostListing data={data} />
    </div>
  </div>
  , document.getElementById('page')
);
