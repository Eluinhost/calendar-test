'use strict';

import React from 'react/addons';
import {TimeFormatter} from '../services';

/**
 * Shows the relative time to the current time for the given Date/moment object.
 *
 * Props:
 *  {date|moment|*} time - the date to show, if not a date/moment it will show 'Unknown'
 *  {number} refresh - the between refreshes (ms), falsey value for no timer
 */
class RelativeTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actualDate: RelativeTime.getDateFor(this.props.time)
    }
  }

  componentDidMount() {
    this.startTimer(this.props.refresh)
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.time !== this.props.time) {
      this.setState({
        actualDate: RelativeTime.getDateFor(newProps.time)
      })
    }

    if (newProps.refresh !== this.props.refresh) {
      this.stopTimer();
      this.startTimer(newProps.refresh);
    }
  }

  static getDateFor(value) {
    if (_.isDate(value)) return value;

    if (value && value._isAMomentObject) return value.toDate();

    return undefined;
  }

  startTimer(refresh) {
    if (refresh)
      this.timer = setInterval(() => this.tick, refresh);
  }

  stopTimer() {
    if (this.timer)
      clearTimeout(this.timer);
  }

  tick() {
    this.forceUpdate();
  }

  render() {
    return <span title={this.state.actualDate}>{this.state.actualDate ? TimeFormatter.format(this.state.actualDate) : 'Unknown'}</span>;
  }
}

module.exports = RelativeTime;
