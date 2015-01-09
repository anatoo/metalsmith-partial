var assert = require('assert');
var equal = require('assert-dir-equal');
var metalsmith = require('metalsmith');
var templates = require('metalsmith-templates');
var partial = require('..');

describe('metalsmith-partial', function() {
  it('should render a basic partial', function(done) {
    metalsmith(__dirname + '/fixtures/basic')
      .use(partial({engine: 'eco'}))
      .use(templates({engine: 'eco', inPlace: true}))
      .build(function(error) {
        if (error) {
          throw error;
        }
        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');
        done();
      });
  });
});
