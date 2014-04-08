prototypal
==========

[![build status](https://secure.travis-ci.org/WebReflection/prototypal.png)](http://travis-ci.org/WebReflection/prototypal)

[Mit Style License](./LICENSE.txt)

##### Where is Class ?
The initial `Class` module has been moved into [this page](./Class.md)

### prototypal
All utilities in this namespace should work with **every** JavaScript engine, down to IE6, Opera Mini, duktape, nodejs, and all others.

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
var n = prototypal.create(null);

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

### prototypal.Class(extend[, prototype])
Similar to `prototypal.create`, `Class` aim is to define reusable prototypes.
```javascript
var Class = prototypal.Class;

var Null = Class(null, {
  // some optional method
  // that we might want to inherit
});

var n = new Null;
n instanceof Object; // false
```
The signature accepts a single argument as function, where its prototype will be used as inheritance chain, or an object to extend or a prototype.
```javascript
var Rectangle = Class({
  constructor: function (width, height) {
    this.width = width;
    this.height = height;
  },
  toString: function () {
    return '[object Rectangle]';
  },
  area: function () {
    return this.width * this.height;
  }
});

var Square = Class(Rectangle, {
  constructor: function (size) {
    Rectangle.call(this, size, size);
  },
  toString: function () {
    return '[object Square]';
  }
});

var s = new Square(3);
s.area(); // 9
'' + s;   // [object Square]
```

### Compatibility
Browser side, you can [test online](http://webreflection.github.io/prototypal/test/) and verify that **even IE6 works** as expected.
Server side, nashorn, duktape, nodejs, and Rhino work as expected too, as well as any other JavaScript server side engine should.