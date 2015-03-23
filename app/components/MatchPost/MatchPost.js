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

class PostIcon extends React.Component {
  shouldComponentUpdate() {
    // should never need to rerender
    return false;
  }

  render() {
    return <i className="match-post__icon ui user icon"></i>;
  }
}

class PostRibbon extends React.Component {
  render() {
    var address = this.props.data.get('address');

    return (
      <a
        href={'https://reddit.com/u/' + this.props.data.get('author')}
        className="ui ribbon label match-post__ribbon"
        target="_blank">
        <div className="match-post__author">
          <i className="reddit icon" />
          {this.props.data.get('author')}
        </div>
        {address ?  <div className="match-post__address"><i className="cubes icon" />{address}</div> : ''}
      </a>
    )
  }
}

class PostHeader extends React.Component {
  render() {
    return (
      <div>
        <h2 className="match-post__title">
          <a href={this.props.data.get('permalink')} target="_blank">{this.props.data.get('title')}</a>
        </h2>
        <PostRibbon data={this.props.data} />
      </div>
    );
  }
}

class PostBody extends React.Component {
  render() {
    return (
      <div className="match-post__post">
        <MarkdownView markdown={this.props.data.get('content')} />
      </div>
    );
  }
}

class PostDetails extends React.Component {
  render() {
    return (
      <div className="match-post__content">
        <PostHeader data={this.props.data} />
        <PostBody data={this.props.data} />
      </div>
    );
  }
}

class MatchPost extends React.Component {
  render() {
    return (
      <div className="match-post">
        <StartTime starts={this.props.data.get('starts')} />
        <PostIcon />
        <PostDetails data={this.props.data} />
      </div>
    );
  }
}

module.exports = MatchPost;
