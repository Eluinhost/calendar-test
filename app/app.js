'use strict';

import 'semantic-ui-css/semantic.min.css';

import React from 'react/addons';
import Immutable from 'immutable';
import _ from 'lodash';

import MatchPostListing from './components/MatchPostListing';
import {MatchPostStore} from './stores';

var data = Immutable.List(_.range(100));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    MatchPostStore.listen((items) => this.setState({data: items}));
  }

  render() {
    return (
      <div className="ui page grid">
        <div className="ui column">
          <MatchPostListing data={this.state.data} />
        </div>
      </div>
    );
  }
}

React.render(<App />, document.getElementById('page'));
