# JSON Transmogrify

A simple lib for transforming json data into xml using jsonpath-object-transform and js2xmlparser.

## Install

```
npm install json-transmogrify --save
```

## Usage

```js
var transmogrify = require('json-transmogrify');

var source = './file.json'; // may be a file path, an URL or a javascript object

var options = {
  // root node of target xml
  root: 'xmlRoot',
  // jsonpath-object-transform
  template: {
    id: "$.id"
  },
  // method to mangle raw results from request or file
  postRequest: function(data) { return data; },
  // method to mangle results of jsonpath-object-transform, may return a promise or data
  postTransform: function(data) { return data; },
}

transmogrify(source, options)
  .then(function(data) {
    console.log(data);
  });
```
