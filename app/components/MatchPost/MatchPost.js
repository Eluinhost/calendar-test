'use strict';

import React from 'react/addons';
import {RelativeTime, MarkdownView} from '..';

class MatchPost extends React.Component {
  render() {
    var starts = this.props.data.get('starts');

    return (
      <div className="match-post">
        <time className="match-post__time" dateTime={starts.format('YYYY-MM-DD HH:mm')}>
          <span className="match-post__time__day">{starts.format('MMM DD')}</span>
          <span className="match-post__time__time">{starts.format('HH:mm')}</span>
          <span className="match-post__time__time-relative"><RelativeTime time={starts} refresh="10000" /></span>
        </time>
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
            <div className="ui divider"></div>
            <MarkdownView markdown={this.props.data.get('content')} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = MatchPost;
