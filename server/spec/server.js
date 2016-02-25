var path = require('path');
var expect = require('chai').expect;

var server = require(path.join(__dirname, '..', './server.js'));

describe('server()', function () {
  'use strict';

    it('knows right from wrong', function () {
    expect(true).to.equal(true);
  });

  it('knows wrong from right', function () {
    expect(false).to.equal(false);
  });

  // Add more assertions here
});
