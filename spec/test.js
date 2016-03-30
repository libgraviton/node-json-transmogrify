var fs = require('fs'),
    q = require('q');

describe('transmogrify lib', function() {
  var sut = require('../lib/transmogrify');

  it('exports a function', function() {
    expect(require('../lib/transmogrify')).toEqual(jasmine.any(Function));
  });

  it('converts json to xml', function(done) {
    sut('./spec/fixtures/empty.json').then(function(result) {
      expect(result).toEqual(fs.readFileSync('./spec/fixtures/empty.xml') + '');
      done();
    });
  });

  it('calls postRequest method with data', function(done) {
    sut('./spec/fixtures/empty.json', {
      postRequest: function(data) {
        expect(data).toEqual({});
        done();
        return data;
      }
    });
  });

  it('calls postTransform method with data', function(done) {
    sut('./spec/fixtures/empty.json', {
      postTransform: function(data) {
        expect(data).toEqual({});
        done();
        return data;
      }
    });
  });

  it('lets postTransform return a promise', function(done) {
    sut('./spec/fixtures/empty.json', {
      postTransform: function(data) {
        var deferred = q.defer();
        setTimeout(function() {
          deferred.resolve({value: "test"});
        }, 1);
        return deferred.promise;
      }
    }).then(function(result) {
      expect(result).toEqual(fs.readFileSync('./spec/fixtures/test-value.xml') + '');
      done();
    });
  });

  it('allows passing data as an object and converts it', function(done) {
    sut({}).then(function(result) {
      expect(result).toEqual(fs.readFileSync('./spec/fixtures/empty.xml') + '');
      done();
    });
  });

});
