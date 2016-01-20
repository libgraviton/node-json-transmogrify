# JSON Transmogrify

A simple lib for transforming json data into xml using jsonpath-object-transform and js2xmlparser.

## Install

``
npm install transmogrify --save
``

## Usage

``js
var transmogrify = require('transmogrify');

var source = './file.json'; // or URL to file

var options = {
  // root node of target xml
  root: 'xmlRoot',
  // jsonpath-object-transform
  template: {
    id: "$.id"
  },
  // method to mangle raw results from erquest or file
  postRequest: function(data) { return data; },
  // method to mangle results of jsonpath-object-transform
  postTransform: function(data) { return data; },
}

transmogrify(source, options)
  .then(function(data) {
    console.log(data);
  });
``
