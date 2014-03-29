//remove:
var Class = require('../build/prototypal.node.js').Class;
//:remove

function compare(a, b) {
  return (
    a.writable && b.writable &&
    a.configurable && b.configurable &&
    !a.enumerable && !b.enumerable
  );
}

wru.test([
  {
    name: 'Class',
    test: function () {
      wru.assert(typeof Class === 'function');
    }
  },{
    name: 'inheriting null',
    test: function () {
      var Null = Class(null, {toString: function () {
        return '[object Null]';
      }});
      wru.assert('does not inherit from Object.prototype', !(new Null instanceof Object));
      wru.assert('returns the expected string', String(new Null) === '[object Null]');
    }
  },{
    name: 'default inheritance',
    test: function () {
      var O = Class({});
      wru.assert('does inherit from Object.prototype', new O instanceof Object);
      wru.assert('returns the expected string', String(new O) === '[object Object]');
    }
  },{
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
  }
]);

