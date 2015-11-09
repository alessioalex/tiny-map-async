/* eslint-disable func-names, no-console */
'use strict';

var it = require('tape');
var lolex = require('lolex');
var mapAsync = require('./');

it('should return the results in order', function(t) {
  var clock = lolex.install();
  var items = [1, 2, 3, 4];
  var timeouts = [400, 200, 350, 220];

  mapAsync(items, function(item, index, next) {
    setTimeout(function() {
      next(null, item * 2);
    }, timeouts[index]);
  }, function(err, results) {
    t.deepEqual(results, [2, 4, 6, 8]);

    clock.uninstall();
    t.end();
  });

  clock.tick(400);
});

it('should return early in case there is an error', function(t) {
  var clock = lolex.install();
  var items = [1, 2, 3, 4];
  var error = new Error('let me stop you right there buster!');

  mapAsync(items, 1, function(item, next) {
    if (item === 2) { return next(error); }

    setTimeout(function() {
      next(null, item * 2);
    }, item * 1000);
  }, function(err) {
    t.equal(err, error);

    clock.uninstall();
    t.end();
  });

  clock.tick(2000);
});
