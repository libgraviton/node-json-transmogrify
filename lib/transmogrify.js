var transform = require('jsonpath-object-transform'),
    js2xmlparser = require('js2xmlparser'),
    fs = require('fs'),
    q = require('q');

function transmogrifyCallback(err, rootNode, data, template, postRequest, postTransform) {
    var transformed = js2xmlparser(
        rootNode,
        postTransform(
            transform(
                postRequest(data),
                template
           )
       )
   );
   return transformed;
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
    if (url.substr(0, 4) != 'http') {
      // assume its a file if it starts with http
      fs.readFile(url, function(err, data) {
        deferred.resolve(transmogrifyCallback(err, rootNode, JSON.parse(data), template, postRequest, postTransform));
      });
    } else {
      request({url: url, json: true}, function(err, data) {
        deferred.resolve(transmogrifyCallback(err, rootNode, data, template, postRequest, postTransform));
      });
    }
    return deferred.promise;
};
