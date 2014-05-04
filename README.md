prototypal
==========

[![build status](https://secure.travis-ci.org/WebReflection/prototypal.png)](http://travis-ci.org/WebReflection/prototypal)

[Mit Style License](./LICENSE.txt)

### prototypal
All utilities in this namespace should work with **every** JavaScript engine, down to IE6, Opera Mini, duktape, nodejs, and all others.

#### How / Which File
`npm install prototypal` then `var create = require('prototypal').create`

Same is for `bower install prototypal` AMD module, however needed files are:

  * [minified cross platform](build/prototypal.js) for the `Class` variable only instead of a module
  * [AMD module](build/prototypal.amd.js) minified, for your AMD logic
  * [node.js module](build/prototypal.node.js) for node

This package is registered in `bower` too.

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

#### prototypal.Class(extend[, function])
If the second argument is a function, it will be invoked with the extended parent/super passed as argument.
In such case, the function needs to return descriptors.
```javascript
var Rectangle = Class({
  constructor: function (width, height) {
    this.width = width;
    this.height = height;
  }
});

var Square = Class(Rectangle, function (parent) {
  // a closure with fast and private parent/super access
  // *must* return the descriptors object
  return {
    constructor: function (size) {
      parent.constructor.call(
        this, size, size
      );
    }
  };
});
```


### ES5 prototypal.Class(extend[, prototype])
For JavaScript engines already compatible with ES5, the `Class` is the one proposed initially with `Class.lazy`, `Class.descriptor`, and `Class.bound`.

### General Compatibility
Methods such `prototypal.copy()`, `prototypal.create()`, and `prototypal.keys()` are compatible with all JavaScript and JScript engines, down to Internet Explorer version 6, including **Opera Mini** and other server side based browsers.

You can [test directly online](http://webreflection.github.io/prototypal/test/) if your browser is supported, including **IE6**.

However, while `prototypal.Class` is tested everywhere too, in those browsers where ES5 is available it behaves in a more powerful way (so if these are your browsers targets, just use all extra features such `Class.lazy`, `Class.descriptor`, or `Class.bound`).

All these platforms have been tested against the more powerful ES5 `Class` and its extra features:

  * iOS 5.1 or greater
  * Android 2.2 or greater
  * webOS 2.2 or greater
  * Kindle Fire Silk 3 or greater
  * Windows Phone 7 (IE9 Mobile) or greater
  * BlackBerry 10 or greater
  * Nokia Xpress on WP and Asha 11 or greater
  * Samsung Bada
  * Opera Mini and Opera Mini J2ME
  * FirefoxOS 1.0 or greater
  * Desktop IE9, Chrome, Opera, Safari, Midori, others
  * UC Browser and UC Browser Mini

On the server side, nashorn, duktape, nodejs, and Rhino work as expected too, as well as any other JavaScript server side engine probably should.

If you find any platform that is not green please file a bug and/or let me know, thank you.


##### Where is Class ?
The initial `Class` module has been actually merged in this namespace where available.

Right now you can find more info about `Class` on [this page](./Class.md)