prototypal
==========

[![build status](https://secure.travis-ci.org/WebReflection/prototypal.png)](http://travis-ci.org/WebReflection/prototypal)

[Mit Style License](./LICENSE.txt)

This is the result of a "_tour de force_" out of 4 blog posts about [ECMAScript 5 Descriptors](http://webreflection.blogspot.com/2014/03/what-books-wont-tell-you-about-es5.html) and probably the most compatible `Class` solution entirely based on ES5 Standards you can find these days.

It has been simplified as much as possible and it's a lightweight replacement for an older [redefine.js](https://github.com/WebReflection/redefine#redefinejs) proposal, fitting in about 700bytes minzipped and solving in its core a lot of problems that older, as well as modern Desktop or Mobile browsers, introduced in these days web development.


### prototypal.Class
The **API** is straight forward, `Class({ .. properties .. })` or `Class(extend, { .. properties .. })`, where `extend` can be either `null`, any `object`, or simply a `Function` where in latter case its prototype will be automatically used to chain inheritance.
```javascript
// a Null class example
var Null = Class(null, {});
var n = new Null;
n instanceof Object; // false

// a generic class example
var Rectangle = Class({

  // constructor
  constructor: function (width, height) {
    this.width = width;
    this.height = height;
  },

  // some method
  toString: function () {
    return '[object Rectangle]';
  },

  // default properties
  width: 0,
  height: 0,

  // a simple getter to retrieve the area
  area: Class.descriptor({
    get: function () {
      return this.width * this.height;
    }
  })
});

// a generic extend example
var Square = Class( Rectangle, {
  constructor: function (size) {
    Rectangle.call(this, size, size);
  },
  toString: function () {
    return '[object Square]';
  }
});

var s = new Square(3);
s.area; // 9
'' + s; // [object Square]
```


### About Descriptors
By default, all properties are the same as those found in native JavaScript _classes_
```javascript
// example of native descriptor
Object.getOwnPropertyDescriptor(
  Object.prototype,
  'toString'
);

{ value: [Function: toString],
  writable: true,
  enumerable: false,
  configurable: true }
```
These settings avoid any sort of problems when it comes to inherited defaults, as well as overwritten methods.


#### Class.descriptor({ .. ES5 descriptor .. })
In case any other descriptor is needed, the `Class` offers an easy way do define exactly the needed one:
```javascript
// based on previous example
var Rectangle = Class({

  // ... code as seen before ... 

  // specifying a descriptor as
  // enumerable: false
  // configurable: false
  // get: function () { ... }
  area: Class.descriptor({
    get: function () {
      return this.width * this.height;
    }
  })

});
```


#### Class.lazy(callback)
`lazy` is useful to set a property once avoiding expensive computations or, as example, creating maybe not always needed extra objects, preserving performance, CPU, and allocated RAM.
```javascript
var Person = Class({
  constructor: function (parents) {
    this.parents = parents;
  },
  // here an example of ..
  //   . something maybe not needed right on
  //   . something not always accessed
  //   . something expensive to compute
  // once computed there is no need
  // to compute it again so it should
  // rather be a property than a method
  genealogicTree: Class.lazy(function() {
    var p = this.parents,
        mom = p[0],
        dad = p[1],
        tree = {
          mom: [mom],
          dad: [dad]
        };
    p = mom;
    while (p = p.parents) {
      tree.mom.push(
        p[0].genealogicTree,
        p[1].genealogicTree
      );
    }
    p = dad;
    while (p = p.parents) {
      tree.dad.push(
        p[0].genealogicTree,
        p[1].genealogicTree
      );
    }
    // returning the object that
    // will be set as
    // non writable
    // but configurable
    return tree;
  })
});
```
Being configurable, whenever there is a need to recalculate the property it's still possible to `delete me.genealogicTree` and retrieve it again.


#### Class.bound(callback)
This is a simple internal `lazy` based hook able to automatically bind a method the very first time is accessed.
```javascript
var MouseHandler = Class({
  onClick: Class.bound(function (evt) {
    evt.preventDefault();
    alert(this instanceof MouseHandler); // true
  })
});

var mh = new MouseHandler;
document.body.addEventListener('click', mh.onClick);
```


### Compatibility
If your browser is not in this list, feel free to [test online](http://webreflection.github.io/prototypal/test/) and verify it's green.

**Browsers**
  * Opera Desktop, Opera Mobile, and Opera Mini if using [es5-shim and es5-sham](./test/es5.js) upfront
  * WebKit Android 2+
  * IE9 Desktop or Mobile and above
  * Kindle Fire Silk
  * webOS 2
  * Firefox and Firefox Mobile or FirefoxOS
  * Chrome
  * Safari and Safari Mobile in iOS5+
  * UC Browser
  * Nokia Xpress (Asha and WP)

**Server**
  * node.js, travis builds on 0.8 and higher, might work on 0.6 too
  * need to tests nashorn but `wru` does not work there for some reason I haven't figure out yet

