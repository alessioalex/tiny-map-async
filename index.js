'use strict';

var eachAsync = require('tiny-each-async');
var noop = function noop() {};

module.exports = function mapAsync(arr, parallelLimit, iterator, cb) {
  var results = {};
  var limit = arr.length;
  var callback = cb || noop;
  var iterate = noop;

  if (typeof parallelLimit === 'function') {
    iterate = parallelLimit;
    callback = iterator;
  } else {
    iterate = iterator;
    limit = parallelLimit;
  }

  var iteratorLength = iterate.length;

  eachAsync(arr, limit, function mapItems(item, index, next) {
    var iteratorCallback = function iteratorCallback(err, result) {
      if (err) { return next(err); }

      results[index] = result;
      next();
    };

    var args = (iteratorLength === 2) ? [arr[index], iteratorCallback]
                                      : [arr[index], index, iteratorCallback];

    iterate.apply(null, args);
  }, function sendResults(err) {
    if (err) { return callback(err); }

    // maintain the order the functions were called in for the results as well
    callback(null, Object.keys(results).sort().map(function mapResults(i) {
      return results[i];
    }));
  });
};
