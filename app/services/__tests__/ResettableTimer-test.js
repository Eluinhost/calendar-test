'use strict';

jest.dontMock('../ResettableTimer.js');
jest.dontMock('lodash');

var ResettableTimer = require('../ResettableTimer');

describe('resettable timer', function() {

  it('binds to the instance of none supplied', function(done) {
    var timer = new ResettableTimer(function(x) {
      expect(x).toBe(timer);
      expect(this).toBe(timer);
      this.stop();
      done();
    }, 1000);
  });

  it('can supply custom bind object', function(done) {
    var something = {};

    var timer = new ResettableTimer(function(x) {
      expect(x).toBe(timer);
      expect(this).toBe(something);
      timer.stop();
      done();
    }, 1000, something);
  });
});
