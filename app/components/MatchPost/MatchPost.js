'use strict';

import React from 'react/addons';
import {RelativeTime, MarkdownView} from '..';

class StartTime extends React.Component {
  render() {
    if (this.props.starts) {
      return (
        <time className="match-post__time" dateTime={this.props.starts.format('YYYY-MM-DD HH:mm')}>
          <span className="match-post__time__day">{this.props.starts.format('MMM DD')}</span>
          <span className="match-post__time__time">{this.props.starts.format('HH:mm')}</span>
          <span className="match-post__time__time-relative">
            <RelativeTime time={this.props.starts} refresh="10000" />
          </span>
        </time>
      );
    } else {
      return (
        <time className="match-post__time">
          <span className="match-post__time__day">Unknown</span>
          <span className="match-post__time__time">N/A</span>
        </time>
      )
    }
  }
}

class MatchPost extends React.Component {
  render() {
    return (
      <div className="match-post">
        <StartTime starts={this.props.data.get('starts')} />
        <i className="match-post__icon ui user icon"></i>
        <div className="match-post__content">
          <h2 className="match-post__title">
            <a href={this.props.data.get('permalink')} target="_blank">{this.props.data.get('title')}</a>
          </h2>
          <a
            href={'https://reddit.com/u/' + this.props.data.get('author')}
            className="ui right ribbon label match-post__author"
            target="_blank">
            {this.props.data.get('author')}
          </a>
          <div className="match-post__post">
            <MarkdownView markdown={this.props.data.get('content')} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = MatchPost;
