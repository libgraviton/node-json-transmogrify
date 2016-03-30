var transform = require('jsonpath-object-transform'),
    js2xmlparser = require('js2xmlparser'),
    fs = require('fs'),
    q = require('q');

function transmogrifyCallback(err, rootNode, data, template, postRequest, postTransform) {
  return q.resolve(postTransform(transform(postRequest(data), template))).then(function(post) {
    return js2xmlparser(rootNode, post);
  });
}

module.exports = function (url, options, cb) {

    // initialize defaultable args
    options = options || {};
    cb = cb || function(data) { console.log(arguments); return data; };

    // read options and setup defaults
    var request = options.request || require('request');
    var rootNode = options.root || 'root';
    var template = options.template || {};
    var postRequest = options.postRequest || function(err, res, data) { return data; };
    var postTransform = options.postTransform || function(data) { return data; };

    var deferred = q.defer();

    // transmogrify all the things
    if (typeof url == 'string' && url.substr(0, 4) == 'http') {
      // assume its an URL if it starts with http
      request({url: url, json: true}, function(err, data) {
        deferred.resolve(transmogrifyCallback(err, rootNode, data.body, template, postRequest, postTransform));
      });
    } else if (typeof url == 'string') {
      // assume its a file if its a string that didn't start with http
      fs.readFile(url, function(err, data) {
        deferred.resolve(transmogrifyCallback(err, rootNode, JSON.parse(data), template, postRequest, postTransform));
      });
    } else {
      // assume data was passed in
      deferred.resolve(transmogrifyCallback(null, rootNode, url, template, postRequest, postTransform));
    }
    return deferred.promise;
};
