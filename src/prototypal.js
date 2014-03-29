function(Object){'use strict';
  /*! (C) Andrea Giammarchi - MIT Style License */
  var
    // bind is the only method here that might be missing
    // in ES5 capable browsers, from Android 2 to iOS 5
    bind = Object.bind || function (o, c) {
      c = this;
      return function () {
        return c.apply(o, arguments);
      };
    },
    // all others are shortcuts from available methods
    create = Object.create,
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getPrototypeOf = Object.getPrototypeOf,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    keys = Object.keys,
    i = 0,
    tmp, compat, notIE9
  ;
  function Bound(callback) {
    this._ = callback;
  }
  function Descriptor(object) {
    this._ = object;
  }
  function Lazy(callback) {
    this._ = callback;
  }
  // defaults settings used for all
  // native properties descriptors
  function defaults(value) {
    return {
      value: value,
      configurable: true,
      writable: true
    };
  }
  // simplified method binding, i.e.
  // node.on('click', obj.onclick);
  // where onclick is specified as
  // {onclick:Class.bound(function(){ ... })}
  function bound(d, k) {
    var callback = d[k]._;
    d[k]._ = function () {
      return bind.call(callback, this);
    };
    return lazy(d, k, callback);
  }
  // simplified lazy assignment, i.e.
  // {method:Class.lazy(function(){
  //   // lazily assigned only once
  //   return Math.random();
  // })}
  function lazy(d, k, c) {
    var callback = d[k]._;
    return {
      configurable: true,
      get: function asd() {
        var self = this, proto = self, desc;
        // if accessed directly through the Class.prototype,
        // returns the original callback otherwise it could compromise
        // all instances based on lazy pattern
        // if it was a bound method, it will return the original too
        // the whole aim of this Class.js is to avoid dealing directly
        // with the constructor, which means only prototype
        // should have constructor as own property, never instances
        if (hasOwnProperty.call(self, 'constructor')) {
          return c || callback;
        }
        // Android 2.x and webOS 2 bug only
        if (compat) {
          while (!desc && (proto = getPrototypeOf(proto))) {
            desc = getOwnPropertyDescriptor(proto, k);
          }
          delete proto[k];
        }
        if (notIE9 || !getOwnPropertyDescriptor(self, k)) {
          // redefine as configurable to be able later on
          // to delete it again
          defineProperty(self, k, {
            configurable: true,
            value: callback.call(self)
          });
        }
        // still Android 2.x and webOS 2 only
        if (compat) {
          defineProperty(proto, k, desc);
        }
        return self[k];
      }
    };
  }
  // parse descriptors, looking for
  // functions or lazy/bound properties
  function descriptify(d, k) {
    var current = d[k];
    if(current instanceof Bound) {
      d[k] = bound(d, k);
    } else if(current instanceof Descriptor) {
      d[k] = current._;
    } else if(current instanceof Lazy) {
      d[k] = lazy(d, k);
    } else {
      d[k] = defaults(current);
    }
    return d;
  }
  // the main entry point
  // accepts 1 or 2 arguments
  // Class({ ... descriptors ... })
  // Class(nullOrObjectOrClass, { ... descriptors ... })
  function Class(proto, descriptors) {
    var d, extending = descriptors != null,
        d = keys(
          d = extending ? descriptors : proto
        ).reduce(descriptify, d),
        constructor = (
          hasOwnProperty.call(d, 'constructor') ?
          d.constructor :
          d.constructor = defaults(function Class(){})
        ).value;
    return (extending ?
      (constructor.prototype = create(
        typeof proto === 'function' ?
          proto.prototype : proto, d)) :
      defineProperties(constructor.prototype, d)
    ).constructor;
  }
  // Android 2.x and webOS 2 bug only
  tmp = create(defineProperty({},'_',{get:function(){
    ++i; // you wouldn't believe this ... IE9 Mobile
    return defineProperty(this,'_',{value:false})._;
  }}));
  try {
    compat = tmp._ || tmp._;
  } catch(e) {
    compat = true;
  }
  notIE9 = i === 1; // seriously !!!
  return defineProperties(Class, {
    Class: {value: Class},
    bound: {value: function (callback) {
      return new Bound(callback);
    }},
    descriptor: {value: function (object) {
      return new Descriptor(object);
    }},
    lazy: {value: function (callback) {
      return new Lazy(callback);
    }}
  });
}(Object)