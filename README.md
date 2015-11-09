# tiny-map-async

Asynchronous version of map that is similar to `async.map`, but has extra goodies included: concurrency limit and optional index param for the iterator function.

[![build status](https://secure.travis-ci.org/alessioalex/tiny-map-async.png)](http://travis-ci.org/alessioalex/tiny-map-async)

## Usage

### map(array, [limit], iterator, [callback])

Arguments:

- array - An array of items to iterate through.
- [limit] - An (optional) integer for determining how many `iterator` functions should be run in parallel.
- iterator(item, [index], callback) - A function to be applied to each item in the array. When it has finished processing then the `callback` function should be called with `(error, result)`.
- callback(err) - An optional callback function that gets called when either all `iterator` functions have finished or one of them has returned an error.

### Example

```js
var path = require('path');
var fs = require('fs');
var mapAsync = require('tiny-map-async');

var root = path.resolve(__dirname, '../');
// get an array of files inside root
var files = fs.readdirSync(root).map(function getFullPath(filename) {
  return path.resolve(root, filename);
});

mapAsync(files, fs.stat, function(err, results) {
  // results is now an array of stats for each file
  if (err) { throw err; }

  results.forEach(function(res, index) {
    console.log('\n' + files[index] + ': \n', res);
  });
});
```

## Tests

```bash
npm test
```

## License

MIT
