/* eslint-disable func-names, no-console */
'use strict';

var path = require('path');
var fs = require('fs');
var mapAsync = require('../');

var root = path.resolve(__dirname, '../');
// get an array of files inside root
var files = fs.readdirSync(root).map(function getFullPath(filename) {
  return path.resolve(root, filename);
});

// the iterator will be limited to a maximum of 2 operations at a time
mapAsync(files, 2, fs.stat, function(err, results) {
  // results is now an array of stats for each file
  if (err) { throw err; }

  results.forEach(function(res, index) {
    console.log('\n' + files[index] + ': \n', res);
  });
});
