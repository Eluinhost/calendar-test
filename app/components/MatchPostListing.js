'use strict';

import React from 'react/addons';
import _ from 'lodash';
import {MatchPostStore} from '../stores';
import {RelativeTime} from '.';
import {shallowEqual} from '../services';
import MatchPost from './MatchPost';

class MatchPostItemHeader extends React.Component {
  shouldComponentUpdate(newProps) {
    return !shallowEqual(newProps, this.props);
  }

  render() {
    return (
      <div className="content">
        <div className="center aligned header">
          <a href={this.props.permalink} target="_blank">{this.props.title}</a>
        </div>
      </div>
    );
  }
}
MatchPostItemHeader.propTypes = {
  permalink: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

class MatchPostItemTimers extends React.Component {
  shouldComponentUpdate(newProps) {
    // only rerender if the time changes
    return !newProps.starts.isSame(this.props.starts) || !newProps.opens.isSame(this.props.opens);
  }

  render() {
    var start1;
    var start2;
    if (this.props.starts) {
      start1 = this.props.starts.format('MMM DD');
      start2 = this.props.starts.format('HH:mm');
    } else {
      start1 = 'Unknown';
    }

    return (
      <div className="extra content">
        <div className="left floated header">
          {start1}
          <br />
          {start2}
        </div>
        <div className="right floated">
          <i className="ui clock icon" />
          <RelativeTime time={this.props.opens} refresh="10000" />
          <br />
          <i className="ui toggle right icon" />
          <RelativeTime time={this.props.starts} refresh="10000" />
        </div>
      </div>
    );
  }
}
MatchPostItemTimers.propTypes = {
  opens: React.PropTypes.date,
  starts: React.PropTypes.date
};

class MatchPostItemServerDetails extends React.Component {
  shouldComponentUpdate(newProps) {
    return !shallowEqual(newProps, this.props);
  }

  render() {
    return (
      <div className="extra content">
        <div className="left floated">
          <i className="ui globe icon" /> {this.props.region || 'Unknown'}
        </div>
        <div className="right floated">
          {this.props.address || 'Unknown'} <i className="ui plug icon" />
        </div>
      </div>
    );
  }
}
MatchPostItemServerDetails.propTypes = {
  region: React.PropTypes.string,
  address: React.PropTypes.string
};

class MatchPostItemAuthor extends React.Component {
  shouldComponentUpdate(newProps) {
    return !shallowEqual(newProps, this.props);
  }

  render() {
    return (
      <div className="extra content">
        <div className="right floated">
            {this.props.author} <i className="ui user icon" />
        </div>
      </div>
    )
  }
}
MatchPostItemAuthor.propTypes = {
  author: React.PropTypes.string.isRequired
};

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
        <MatchPostItemHeader title={this.props.data.get('title')} permalink={this.props.data.get('permalink')} />
        <MatchPostItemTimers opens={this.props.data.get('opens')} starts={this.props.data.get('starts')} />
        <MatchPostItemServerDetails region={this.props.data.get('region')} address={this.props.data.get('address')} />
        <MatchPostItemAuthor author={this.props.data.get('author')} />
      </div>
    );
  }
}
MatchPostItem.colors = ['black', 'blue', 'green', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'];

class MatchPostListing extends React.Component {
  render() {
    return <ul className="match-post-timeline">{_.values(this.props.data).map((item, index) => <li key={index}><MatchPost data={item} /></li>)}</ul>;
  }
}

module.exports = MatchPostListing;
