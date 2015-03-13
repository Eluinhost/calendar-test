'use strict';

jest.dontMock('../shallowEqual');

describe('shallow equal', function() {

  var shallowEqual = require('../shallowEqual');

  it('passes if same object', function() {
    var obj = {
      a: 'a',
      b: 'b'
    };

    expect(shallowEqual(obj, obj)).toBe(true);
  });

  it('fails if either non-object', function() {
    var obj1 = {
      a: 'a',
      b: 'b'
    };
    var array = [];

    expect(shallowEqual(obj1, array)).toBe(false);
    expect(shallowEqual(array, obj1)).toBe(false);
  });

  it('fails if a key is missing', function() {
    var obj1 = {
      a: 'a',
      b: 'b',
      c: 'c'
    };
    var obj2 = {
      a: 'a',
      b: 'b'
    };

    expect(shallowEqual(obj1, obj2)).toBe(false);
    expect(shallowEqual(obj2, obj1)).toBe(false);
  });

  it('fails if a key has a different value', function() {
    var obj1 = {
      a: 'a',
      b: 'c'
    };
    var obj2 = {
      a: 'a',
      b: 'b'
    };

    expect(shallowEqual(obj1, obj2)).toBe(false);
    expect(shallowEqual(obj2, obj1)).toBe(false);
  });

  it('passes for equal objects', function() {
    var obj1 = {
      a: 'a',
      b: 'b'
    };
    var obj2 = {
      a: 'a',
      b: 'b'
    };

    expect(shallowEqual(obj1, obj2)).toBe(true);
    expect(shallowEqual(obj2, obj1)).toBe(true);
  });

  it('shouldn\'t deep compare objects', function() {
    var obj1 = {
      a: 'a',
      b: {
        c: 'c'
      }
    };
    var obj2 = {
      a: 'a',
      b: {
        c: 'c'
      }
    };

    expect(shallowEqual(obj1, obj2)).toBe(false);
    expect(shallowEqual(obj2, obj1)).toBe(false);
  });
});
