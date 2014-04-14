function(Object){'use strict';
  // (C) Andrea Giammarchi
  var

    CONSTRUCTOR = 'constructor',
    PROTOTYPE = 'prototype',
    DIRTY = '__proto__',

    bind = Object.bind || function (context) {
      var callback = this;
      return function () {
        return callback.apply(context, arguments);
      };
    },
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getPrototypeOf = Object.getPrototypeOf,
    originalCreate = Object.create,

    inherited = [
      CONSTRUCTOR,
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ],
    i = 0,

    // IE only bug
    enumerableBug = !{valueOf:0}[inherited[3]](inherited[6]),

    // hasOwnProperty shortcut
    has = {}[inherited[1]],

    keys = Object.keys || function (o) {
      var r = [], k;
      for (k in o) {
        if (has.call(o, k)) {
          r.push(k);
        }
      }
      if (enumerableBug) {
        for (i = 0; i < inherited.length; i++) {
          if (has.call(o, k = inherited[i])) {
            r.push(k);
          }
        }
      }
      return r;
    },

    create = originalCreate ?

      // IE 9 and 10 native Object.create
      // has a very weird enumerable bug
      // @link http://javascript.ru/forum/307139-post39.html
      (function (o) {
        o[1] = 1;
        if (has.call(o, 1)) return originalCreate;
        o = {configurable:true};
        return function (p) {
          var r = originalCreate(p);
          return has.call(r, 0) ?
            r : delete defineProperty(r, 0, o)[0], r;
        };
      }(originalCreate(Object[PROTOTYPE]))) :

      // concretely polyfilled with one argument only
      // do not include other polyfills before this file
      // or compatibility might be compromised
      (function(){
        var
          Null = function () {
            var
              win,
              doc = document,
              iframe = doc.createElement('iframe'),
              parent = doc.body || doc.documentElement
            ;
            iframe.style.display = 'none';
            parent.insertBefore(iframe, parent.firstChild);
            iframe.src = 'javascript:';
            win = iframe.contentWindow;
            if (!win.Object) {
              // hello IE6
              doc = win.document;
              doc.open();
              doc.write('<script><' + '/script>');
              doc.close();
            }
            Null = function () {};
            Null[PROTOTYPE] = win.Object[PROTOTYPE];
            parent.removeChild(iframe);
            doc = parent = iframe = null;
            for (i = 0; i < inherited.length; delete Null[PROTOTYPE][inherited[i++]]);
            return new Null;
          }
        ;
        return function (p) {
          return p ? chain(p) : new Null;
        };
      }())
    ,
    set = Object.setPrototypeOf || (
      // Opera Mini proof check
      {__proto__:null} instanceof Object ?
      // __proto__ does not work
      function (o, p) {
        return copyEnumerables(create(p), o);
      } :
      // proto does work
      function (o, p) {
        o.__proto__ = p;
        return o;
      }
    ),
    constructorPrototype = constructor[PROTOTYPE],
    hasConfigurableBug,
    hasNotOwnPropertyBug,
    tmp
    // , unsafeDictionary = DIRTY in {} && DIRTY in create(null)
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

  function chain(p) {
    constructor[PROTOTYPE] = p;
    var r = new constructor;
    constructor[PROTOTYPE] = constructorPrototype;
    return r;
  }

  function constructor() {}

  function copyEnumerables(r, o) {
    for (var k in o) {
      if (has.call(o, k)) {
        r[k] = o[k];
      }
    }
    if (enumerableBug) {
      for (i = 0; i < inherited.length; i++) {
        if (has.call(o, k = inherited[i])) {
          r[k] = o[k];
        }
      }
    }
    return r;
  }

  // defaults settings used for all
  // native properties descriptors
  function defaults(value) {
    return {
      value: value,
      enumerable: false,
      configurable: true,
      writable: true
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

  function getConstructor(d, process) {
    return has.call(d, CONSTRUCTOR) ?
      d[CONSTRUCTOR] :
      (d[CONSTRUCTOR] = process(function Class() {}));
  }

  function getDescriptors(inheriting, descriptors) {
    return typeof descriptors === 'function' ?
      descriptors(inheriting) : descriptors;
  }

  function getExtend(proto) {
    return typeof proto === 'function' ?
      proto[PROTOTYPE] : proto;
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
        if (hasOwnProperty.call(self, CONSTRUCTOR)) {
          return c || callback;
        }
        // Android 2.x and webOS 2 bug only
        if (hasConfigurableBug) {
          while (!desc && (proto = getPrototypeOf(proto))) {
            desc = getOwnPropertyDescriptor(proto, k);
          }
          delete proto[k];
        }
        if (hasNotOwnPropertyBug || !hasOwnProperty.call(self, k)) {
          // redefine as configurable to be able later on
          // to delete it again
          defineProperty(self, k, {
            configurable: true,
            value: callback.call(self)
          });
        }
        // still Android 2.x and webOS 2 only
        if (hasConfigurableBug) {
          defineProperty(proto, k, desc);
        }
        return self[k];
      }
    };
  }

  if (getOwnPropertyDescriptor) {
    // Android 2.x and webOS 2 bug only
    tmp = originalCreate(defineProperty({},'_',{get:function(){
      ++i; // you wouldn't believe this ... IE9 Mobile ... >
      return defineProperty(this,'_',{value:false})._;
    }}));
    try {
      hasConfigurableBug = tmp._ || tmp._;
    } catch(e) {
      hasConfigurableBug = true;
    }
    hasNotOwnPropertyBug = 1 === i; // < ... seriously !!!
  }

  return {
    Class: getOwnPropertyDescriptor ?
      defineProperties(
        function Class(proto, descriptors) {
          var
            extending = descriptors != null,
            inheriting = extending && getExtend(proto),
            d = extending ?
              getDescriptors(inheriting, descriptors) :
              (proto || {}),
            constructor = getConstructor(
              d = keys(d).reduce(descriptify, d),
              defaults
            ).value
          ;
          return (extending ?
            (constructor[PROTOTYPE] = originalCreate(inheriting, d)) :
            defineProperties(constructor[PROTOTYPE], d)
          )[CONSTRUCTOR];
        },
        {
          bound: {value: function bound(callback) {
            return new Bound(callback);
          }},
          descriptor: {value: function descriptor(object) {
            return new Descriptor(object);
          }},
          lazy: {value: function lazy(callback) {
            return new Lazy(callback);
          }}
        }
      ) :
      function Class(proto, descriptors) {
        var
          extending = descriptors != null,
          inheriting = extending && getExtend(proto),
          d = extending ?
            getDescriptors(inheriting, descriptors) :
            (proto || {}),
          constructor = getConstructor(d, Object)
        ;
        return (constructor[PROTOTYPE] = extending ?
          copyEnumerables(create(inheriting), d) : d
        )[CONSTRUCTOR];
      }
    ,
    copy: copyEnumerables,
    create: function (p, o) {
      return o == null ? create(p) : set(o, p);
    },
    keys: keys
  };
}(Object)