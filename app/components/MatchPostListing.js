'use strict';

import React from 'react/addons';
import _ from 'lodash';
import {MatchPostStore} from '../stores';
import {RelativeTime} from '.';

class MatchPostItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: MatchPostItem.colors[_.random(0, MatchPostItem.colors.length)]
    }
  }
  render() {
    var starts = this.props.data.get('starts');
    var start1, start2;
    if (starts) {
      start1 = starts.format('MMM DD');
      start2 = starts.format('HH:mm');
    } else {
      start1 = 'Unknown';
    }

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
            {start1}
            <br />
            {start2}
          </div>
          <div className="right floated">
            <i className="ui clock icon" />
            <RelativeTime time={this.props.data.get('opens')} refresh="10000" />
            <br />
            <i className="ui toggle right icon" />
            <RelativeTime time={this.props.data.get('starts')} />
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
