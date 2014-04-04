prototypal
==========

[![build status](https://secure.travis-ci.org/WebReflection/prototypal.png)](http://travis-ci.org/WebReflection/prototypal)

[Mit Style License](./LICENSE.txt)

##### Where is Class ?
The initial `Class` module has been moved into [this page](./Class.md)

### prototypal
Right now, `prototypal.create()` is the only utility method available but it should work with **every** JavaScript engine, down to IE6.

#### How
`npm install prototypal` then `var create = require('prototypal').create`

Same is for `bower install prototypal` AMD module, however needed files are:

  * [minified cross platform](build/prototypal.js) for the `Class` variable only instead of a module
  * [AMD module](build/prototypal.amd.js) minified, for your AMD logic
  * [node.js module](build/prototypal.node.js) for node

### prototypal.create(extend[, properties])
The **API** is very similar to the one proposed in [lo-dash](http://lodash.com/docs#create) **except** it promotes instead of copying over the `properties` object whenever is possible (for better performance)
```javascript
// a null object example
var n = create(null);

// a generic inherited example
var a = {
      testa: 123
    },
    b = create(a, {
      testb: 456
    });

a.hasOwnProperty('testa'); // true
b.hasOwnProperty('testa'); // false
b.hasOwnProperty('testb'); // true
b.testa; // 123
b.testb; // 456
```

### Compatibility
You can [test online](http://webreflection.github.io/prototypal/test/) and verify that **even IE6 works** as expected.