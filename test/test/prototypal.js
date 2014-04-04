//remove:
var create = require('../build/prototypal.node.js').create;
//:remove

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
  }
]);

