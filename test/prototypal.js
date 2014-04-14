//remove:
var prototypal = require('../build/prototypal.node.js');
//:remove


function compareProperty(name, a, b) {
  return a.hasOwnProperty(name) && b.hasOwnProperty(name) && a[name] === b[name];
}
function compare(a, b) {
  return (
    compareProperty('writable', a, b) &&
    compareProperty('configurable', a, b) &&
    compareProperty('enumerable', a, b)
  );
}

var
  create = prototypal.create,
  Class = prototypal.Class
;

wru.test([
  {
    name: 'null',
    test: function () {
      var n = create(null);
      if ('__proto__' in n) {
        wru.log('[WARN] unsafe null environment');
      }
      wru.assert(
        'null object are not instanceof Object',
        !(n instanceof Object)
      );
      wru.assert('no constructor', !n.constructor);
      wru.assert('no hasOwnProperty', !n.hasOwnProperty);
      wru.assert('no isPrototypeOf', !n.isPrototypeOf);
      wru.assert('no propertyIsEnumerable', !n.propertyIsEnumerable);
      wru.assert('no toLocaleString', !n.toLocaleString);
      wru.assert('no toString', !n.toString);
      wru.assert('no valueOf', !n.valueOf);
      for (var k in n) wru.assert('failing a for/in loop', false);
    }
  }, {
    name: 'inheritance',
    test: function () {
      var a = {}, b = create(a);
      wru.assert('inherits', a.isPrototypeOf(b));
      a = create(null); b = create(a);
      wru.assert('inherits from null', {}.isPrototypeOf.call(a, b));
    }
  }, {
    name: 'extending',
    test: function () {
      var a = {},
          b = create(a, {
            test: 123
          });
      wru.assert('inherited', a.isPrototypeOf(b));
      wru.assert('extending', b.hasOwnProperty('test') && b.test === 123);
    }
  }, {
    name: 'extending null',
    test: function () {
      var a = create(null),
          b = create(a, {
            test: 123
          });
      wru.assert('inherited', {}.isPrototypeOf.call(a, b));
      wru.assert('extending', {}.hasOwnProperty.call(b, 'test') && b.test === 123);
      wru.assert('not an instanceof Object', b instanceof Object === false);
      b = create(null, {
        test: 123
      });
      wru.assert('directly inherited', b instanceof Object === false);
      wru.assert('directly extended', {}.hasOwnProperty.call(b, 'test') && b.test === 123);
    }
  }, {
    name: 'Class basics',
    test: function () {
      var A = Class({test: 123, toString: function () {
          return '[object A]';
        }}),
        a = new A;
      wru.assert('there is a default constructor', a.constructor !== Object);
      wru.assert('properties are there', a.test === 123);
      wru.assert('toString is there too', a.toString() === '[object A]');
    }
  }, {
    name: 'Class inheritance',
    test: function () {
      var
        A = Class({test: 456, toString: function () {
          return '[object A]';
        }}),
        B = Class(A, {
          toString: function () {
            return '[object ' + this.test + ']';
          }
        }),
        b = new B;
      wru.assert('there is a default constructor', b.constructor === B);
      wru.assert('prototype inheritance', b instanceof A && b instanceof B);
      wru.assert('methods override', b.toString() === '[object 456]');
    }
  }, {
    name: 'null inheritance',
    test: function () {
      var Null = Class(null, {});
      wru.assert('not inheriting Object', !(new Null instanceof Object));
    }
  }, {
    name: 'keys & copy',
    test: function () {
      var a = {a:123, toString: function () {}};
      wru.assert('finds all keys', prototypal.keys(a).sort().join(',') === 'a,toString');
      var b = prototypal.copy({}, a);
      wru.assert('copies all the things', b.a === a.a && b.toString === a.toString);
    }
  }, {
    name: 'numeric properties without bug',
    test: function () {
      var o = create(Object.prototype);
      o[1] = 1;
      wru.assert('Object.prototype', o.hasOwnProperty(1));
      var o = create(Object.prototype);
      o[0] = 0;
      wru.assert('Object.prototype zero', o.hasOwnProperty(0));
      var o = create(null);
      o[1] = 1;
      wru.assert('null', Object.prototype.hasOwnProperty.call(o, 1));
      var o = create(null);
      o[0] = 0;
      wru.assert('null zero', Object.prototype.hasOwnProperty.call(o, 0));
    }
  }
].concat(
  Object.getOwnPropertyDescriptor ?
[
  {
    name: 'methods and constructors descriptors',
    test: function () {
      var A = function A() {},
          B = Class({}),
          C = Class({method:function(){}}),
          D = Class({constructor:A});
      wru.assert('default constructors are different', (new B).constructor !== (new C).constructor);
      wru.assert('unless specified', A === (new D).constructor);
      wru.assert('constructor descriptors are similar to native one',
        compare(
          Object.getOwnPropertyDescriptor(
            A.prototype, 'constructor'
          ),
          Object.getOwnPropertyDescriptor(
            B.prototype, 'constructor'
          )
        ) &&
        compare(
          Object.getOwnPropertyDescriptor(
            A.prototype, 'constructor'
          ),
          Object.getOwnPropertyDescriptor(
            C.prototype, 'constructor'
          )
        )  &&
        compare(
          Object.getOwnPropertyDescriptor(
            A.prototype, 'constructor'
          ),
          Object.getOwnPropertyDescriptor(
            D.prototype, 'constructor'
          )
        )
      );
      wru.assert('methods descriptors are similar to native one',
        compare(
          Object.getOwnPropertyDescriptor(
            Object.prototype, 'toString'
          ),
          Object.getOwnPropertyDescriptor(
            C.prototype, 'method'
          )
        )
      );
    }
  },{
    name: 'extending',
    test: function () {
      function ClassC(){}
      var A = Class({}),
          B = Class(A, {}),
          C = Class(B, {constructor: ClassC});
      wru.assert('super inheritance preserved', (new B) instanceof A);
      wru.assert('instance preserved', (new B) instanceof B);
      wru.assert('constructor still not enumerable + own property',
        compare(
          Object.getOwnPropertyDescriptor(
            A.prototype, 'constructor'
          ),
          Object.getOwnPropertyDescriptor(
            B.prototype, 'constructor'
          )
        )
      );
      wru.assert('C super super inheritance preserved', (new C) instanceof A);
      wru.assert('C super inheritance preserved', (new C) instanceof B);
      wru.assert('C instance preserved', (new C) instanceof C);
      wru.assert('C constructor still not enumerable + own property',
        compare(
          Object.getOwnPropertyDescriptor(
            Object.prototype, 'constructor'
          ),
          Object.getOwnPropertyDescriptor(
            C.prototype, 'constructor'
          )
        )
      );
      wru.assert('C constructor is the expected one', (new C).constructor === ClassC);
    }
  },{
    name: 'lazy',
    test: function () {
      var tmp, ctx,
        method = function () {
          ctx = this;
          tmp = Math.random();
          return tmp;
        },
        Lazy = Class({
          prop: Class.lazy(method)
        }),
        desc = Object.getOwnPropertyDescriptor(Lazy.prototype, 'prop');
      wru.assert('expected descriptor', desc.get);
      wru.assert('expected configurable', desc.configurable);
      wru.assert('lazy property returns the expected value', (new Lazy).prop === tmp);
      wru.assert('property had actually a random value', /^0\.\d+$/.test(tmp));
      wru.assert('lazy properties can be deleted', delete ctx.prop);
      wru.assert('so that these can be reassigned as lazy properties', (new Lazy).prop === tmp);
      wru.assert('accessing through the class returns initial method', Lazy.prototype.prop === method);
      wru.assert('invoked once and never again', ctx.prop === ctx.prop);
    }
  }, {
    name: 'bound',
    test: function () {
      function setProperty(value) {
        this.property = value;
      }
      var Bound = Class({
        method: Class.bound(setProperty)
      });
      var obj = new Bound;
      wru.assert('method is there as expected through the prototype',
        Bound.prototype.method === setProperty);
      wru.assert('the method is addressed once lazily',
        obj.method ===  obj.method &&
        obj.method !== setProperty
      );
      obj.method(123);
      wru.assert('the method works as expected',
        obj.property === 123);
      wru.assert('bound methods are still configurable',
        delete obj.method);
      wru.assert('but it is possible to have them back as lazy values',
        obj.method ===  obj.method &&
        obj.method !== setProperty
      );
      obj.method('456');
      wru.assert('still working as expected',
        obj.property === '456');
    }
  },{
    name: 'inherited lazy property',
    test: function () {
      var LazyA = Class({
            random: Class.lazy(Math.random)
          }),
          LazyB = Class(LazyA, {}),
          b = new LazyB;
      wru.assert('property works as expected', /^0\.\d+$/.test(b.random) && b.random === b.random);
      wru.assert('original "property" wasn not compromized', LazyA.prototype.random === Math.random);
      wru.assert('inherited "property" is reachable too', LazyB.prototype.random === Math.random);
      wru.assert('inherited descriptor is inherited',
        !Object.getOwnPropertyDescriptor(LazyB.prototype, 'random'));
    }
  },{
    name: 'inherited bound method',
    test: function () {
      function setProperty(value) {
        this.property = value;
        return this.property;
      }
      var BoundA = Class({
            method: Class.bound(setProperty)
          }),
          BoundB = Class(BoundA, {}),
          b = new BoundB;
      wru.assert('bound works as expected', b.method === b.method && b.method(123) === 123);
      wru.assert('original method wasn not compromized', BoundA.prototype.method === setProperty);
      wru.assert('inherited method is reachable too', BoundB.prototype.method === setProperty);
      wru.assert('inherited descriptor is inherited',
        !Object.getOwnPropertyDescriptor(BoundB.prototype, 'method'));
    }
  }, {
    name: 'descriptor',
    test: function () {
      var C = Class({
        getter: Class.descriptor({
          get: function () {
            return Math.random();
          }
        })
      });
      wru.assert('getter works as expected',
        (new C).getter !== (new C).getter && /^0\.\d+$/.test((new C).getter));
    }
  }, {
    name: 'super shortcut',
    test: function () {
      var A = Class({
        set: function (value) {
          this.value = value;
          return this.constructor;
        }
      });
      var B = Class(A, function(parent) {
        return {
          set: function (value) {
            return parent.set.call(this, value);
          }
        };
      });
      var o = new B;
      wru.assert('is instanceof A', o instanceof A);
      wru.assert('is instanceof B', o instanceof B);
      wru.assert('invokes parent', o.set(123) === B && o.value === 123);
    }
  }
] :
[]
));

