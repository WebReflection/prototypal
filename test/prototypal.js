//remove:
var prototypal = require('../build/prototypal.node.js');
//:remove


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
      wru.assert(o.hasOwnProperty(1));
    }
  }
]);

