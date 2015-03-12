'use strict';

import React from 'react/addons';
import _ from 'lodash';
import {MatchPostStore} from '../stores';

class MatchPostItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: MatchPostItem.colors[_.random(0, MatchPostItem.colors.length)]
    }
  }
  render() {
    return (
      <div className={'ui card ' + this.state.color}>
        <div className="content">
          <div className="center aligned header">
            <a href={this.props.data.get('permalink')} target="_blank">
              {this.props.data.get('title')}
            </a>
          </div>
        </div>
        <div className="extra content">
          <div className="left floated header">
            Mar 10 - 21:30
          </div>
          <div className="right floated">
            <i className="ui clock icon" /> 2 hours
            <br />
            <i className="ui toggle right icon" /> 3 hours
          </div>
        </div>
        <div className="extra content">
          <div className="left floated">
            <i className="ui globe icon" /> {this.props.data.get('region')}
          </div>
          <div className="right floated">
            {this.props.data.get('address') || 'Unknown'} <i className="ui plug icon" />
          </div>
        </div>

        <div className="extra content">
          <div className="left floated">
              <i className="ui clock icon" /> 2 hours
              <br />
              <i className="ui toggle right icon" /> 3 hours
          </div>
          <div className="right floated">
            {this.props.data.get('author')} <i className="ui user icon" />
          </div>
        </div>
      </div>
    );
  }
}
MatchPostItem.colors = ['black', 'blue', 'green', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'];


class MatchPostListing extends React.Component {
  render() {
    return <div className="ui two doubling cards">{_.values(this.props.data).map((item, index) => <MatchPostItem key={index} data={item} />)}</div>;
  }
}

module.exports = MatchPostListing;
