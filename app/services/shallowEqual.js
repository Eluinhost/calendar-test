'use strict';

var _ = require('lodash');

module.exports = function(a, b) {
  // if they're the same object
  if (a === b) return true;

  // make sure they're actually objects
  if (!_.isObject(a) || !_.isObject(b)) return false;

  // grab the keys from each object
  var keysA = _.keys(a);
  var keysB = _.keys(b);

  // missing keys between objects
  if (_.xor(keysA, keysB).length) return false;

  // check every key is correct
  return _(keysA).every((key) => a[key] === b[key]);
};
