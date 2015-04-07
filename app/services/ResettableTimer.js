'use strict';

import _ from 'lodash';

class ResettableTimer {

  /**
   * A timer that can be stopped/started/restarted after creation. After construction make sure to start the timer
   *
   * @param {Function} fn - the function to run, gets this object as a single parameter
   * @param {Number} time - the amount of time between invocations of the function
   * @param {Object} [bind=this] - the object to bind the function to, defaults to this object
   */
  constructor(fn, time, bind) {
    this._time = time;
    // bind the function if a value is supplied, otherwise just use this
    this._fn = fn.bind(bind || this);
  }

  /**
   * Stops the current timer if it's already running
   */
  stop() {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
    return this;
  }

  /**
   * Starts the timer if it's not already running
   */
  start() {
    // don't do anything if we're already started
    if (this._timerId) return;

    this._timerId = setInterval(() => {
      this._fn(this);
    }, this._time);

    return this;
  }

  restart() {
    this.stop();
    this.start();
    return this;
  }
}

module.exports = ResettableTimer;
