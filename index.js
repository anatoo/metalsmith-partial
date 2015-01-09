
var fs = require('fs');
var extend = require('extend');
var consolidate = require('consolidate');

module.exports = plugin;

/**
 * @param {Object} options
 * @param {String} options.engine is engine name in consolidate.js
 * @param {String} options.directory is directory to put partial files.
 */
function plugin(options) {
  options = extend({
    directory: 'partials',
    preload: false
  }, options || {});

  if (!options.engine) {
    throw new Error('options.engine is required.');
  }

  return function(files, metalsmith, done) {

    metalsmith.metadata().partial = function(name, params) {
      var path = metalsmith.path(options.directory, name);
      var partialContents = fs.readFileSync(path).toString('utf8');
      var context = params ? extend({}, params, this) : extend({}, this);

      var result = null;

      consolidate[options.engine].render(partialContents, context, function(error, rendered) {
        if (error) {
          throw new Error(error);
        }

        result = rendered;
      });

      if (result === null) {
        throw new Error('This template engine is not supported.');
      }

      returned = true;

      return result;
    };

    done();
  };
}
