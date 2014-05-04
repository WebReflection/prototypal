/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
if(typeof global!="undefined"){var setTimeout=global.setTimeout,setInterval=global.setInterval,clearInterval=global.clearInterval,clearTimeout=global.clearTimeout;setTimeout||(function(h,c,g,a){setInterval=global.setInterval=function b(j,i){return e(j,i,g.call(arguments,2),1)};setTimeout=global.setTimeout=function d(j,i){return e(j,i,g.call(arguments,2))};clearInterval=global.clearInterval=clearTimeout=global.clearTimeout=function f(i){c[i].cancel();h.purge();delete c[i]};function e(l,k,j,i){var m=++a;c[m]=new JavaAdapter(java.util.TimerTask,{run:function(){l.apply(null,j)}});i?h.schedule(c[m],k,k):h.schedule(c[m],k);return m}})(new java.util.Timer(),{},[].slice,0)}else{!function(c,b,a,e){function d(f,g){var h=new Date;while(new Date-h<g){}f.apply(null,e.call(arguments,2))}e=a.slice;c.setTimeout=c.setInterval=d;c.clearInterval=c.clearTimeout=function(){}}(this,0,[])}var wru=function(U){function h(){w=F.call(j);if(w){if(typeof w=="function"){w={name:w[O]||"anonymous",test:w}}l(Z);l((ad(w,O)&&w[O])||(ad(w,e)&&w[e])||L);a=[];q=[];P=[];X={};b("setup");P[ae]||b("test");I||n()}else{p()}}function l(ah,ag){ah=ah+(ag?"":"\n");try{process.stdout.write(ah)}catch(af){try{require("util").print(ah)}catch(af){try{require("sys").print(ah)}catch(af){try{java.lang.System.out.print(ah)}catch(af){try{console.log(ah)}catch(af){print(ah)}}}}}}function p(){var ah=0,ag;l(g);l(Z);switch(true){case !!aa:ah++;ag="error";l(N+"   "+aa+" Errors");break;case !!z:ah++;ag="fail";l(J+g+z+" Failures");break;default:ag="pass";l(y+"      "+o+" Passes")}V.status=ag;l(Z);l(g);V.after();try{process.exit(ah)}catch(af){quit()}}function c(af){for(var ag=0,ah=af[ae];ag<ah;l("    "+(++ag)+". "+af[ag-1])){}}function n(){f();o+=a[ae];z+=q[ae];aa+=P[ae];if(P[ae]){S=N;c(P)}else{if(q[ae]){S=J;c(q)}else{S=y}}l(S+" passes: "+a[ae]+", fails: "+q[ae]+", errors: "+P[ae]);H=0;S=g;h()}function b(af){if(ad(w,af)){try{w[af](X)}catch(ag){W.call(P,g+ag)}}}function ad(ag,af){return m.call(ag,af)}function s(){return B()<0.5?-1:1}function f(){if(M){C(M);M=0}b("teardown")}var V={timeout:u,assert:function Q(ag,af){if(arguments[ae]==1){af=ag;ag=L}v=D;W.call(af?a:q,S+ag);return af},async:function R(ah,ak,ai,aj){var af=ai||V.timeout||(V.timeout=u);aj=++I;if(typeof ah=="function"){af=ak||V.timeout;ak=ah;ah="asynchronous test #"+aj}ai=T(function(){aj=0;W.call(q,ah);--I||(M=T(n,0))},G(af)||V.timeout);return function ag(){if(!aj){return}v=ab;S=ah+": ";try{ak.apply(this,arguments)}catch(al){v=D;W.call(P,S+al)}S=g;if(v){C(ai);--I||(M=T(n,0))}}},test:function k(af,ag){V.after=ag||function(){};j=E.apply(j,[af]);V.random&&ac.call(j,s);I||h()}},D=true,ab=!D,u=100,g=" ",L="unknown",ae="length",O="name",e="description",A="<li>",d="</li>",i="\\|/-",m=V.hasOwnProperty,S=g,Y=S.charAt,t=S.slice,j=[],E=j.concat,r=j.join,W=j.push,F=j.shift,ac=j.sort,I=0,H=0,o=0,z=0,aa=0,M=0,N="\x1B[1;31mERROR\x1B[0m",J="\x1B[0;31mFAILURE\x1B[0m",y="\x1B[0;32mOK\x1B[0m",Z="------------------------------",x,G,B,T,C,w,K,a,q,P,X,v;V.log=function(ah,ag){try{if(ag){throw new Error}console.log(ah)}catch(af){l(ah,0)}};if(typeof __dirname!="undefined"){U.wru=V;U.assert=V.assert;U.async=V.async;U.test=V.test;U.log=V.log;U.random=false;Object.defineProperty(U,"status",{get:function(){return V.status}});Object.defineProperty(U,"timeout",{get:function(){return V.timeout},set:function(af){V.timeout=parseInt(af,10)||V.timeout}});U=global}x=U.Math;G=x.abs;B=x.random;T=U.setTimeout;C=U.clearTimeout;U.setInterval(function(){I&&l(g+Y.call(i,H++%4)+"\b\b",true)},u);undefined;u*=u;V.random=ab;return V}(this);
/*! (C) Andrea Giammarchi Mit Style License */
this.prototypal=function(e){"use strict";function S(e){this._=e}function x(e){this._=e}function T(e){this._=e}function N(e,t){var n=e[t]._;return e[t]._=function(){return i.call(n,this)},P(e,t,n)}function C(e){k[n]=e;var t=new k;return k[n]=g,t}function k(){}function L(e,t){for(var n in t)p.call(t,n)&&(e[n]=t[n]);if(h)for(c=0;c<l.length;c++)p.call(t,n=l[c])&&(e[n]=t[n]);return e}function A(e){return{value:e,enumerable:!1,configurable:!0,writable:!0}}function O(e,t){var n=e[t];return n instanceof S?e[t]=N(e,t):n instanceof x?e[t]=n._:n instanceof T?e[t]=P(e,t):e[t]=A(n),e}function M(e,n){return p.call(e,t)?e[t]:e[t]=n(function(){})}function _(e,t){return typeof t=="function"?t(e):t}function D(e){return typeof e=="function"?e[n]:e}function P(e,n,r){var i=e[n]._;return{configurable:!0,get:function(){var o=this,f=o,l;if(hasOwnProperty.call(o,t))return r||i;if(y){while(!l&&(f=a(f)))l=u(f,n);delete f[n]}return(b||!hasOwnProperty.call(o,n))&&s(o,n,{configurable:!0,value:i.call(o)}),y&&s(f,n,l),o[n]}}}var t="constructor",n="prototype",r="__proto__",i=e.bind||function(e){var t=this;return function(){return t.apply(e,arguments)}},s=e.defineProperty,o=e.defineProperties,u=e.getOwnPropertyDescriptor,a=e.getPrototypeOf,f=e.create,l=[t,"hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],c=0,h=!{valueOf:0}[l[3]](l[6]),p={}[l[1]],d=e.keys||function(e){var t=[],n;for(n in e)p.call(e,n)&&t.push(n);if(h)for(c=0;c<l.length;c++)p.call(e,n=l[c])&&t.push(n);return t},v=f?function(e){return e[1]=1,p.call(e,1)?f:(e={configurable:!0},function(t){var n=f(t);return p.call(n,0)?n:delete s(n,0,e)[0],n})}(f(e[n])):function(){var e=function(){var t,r=document,i=r.createElement("iframe"),s=r.body||r.documentElement;i.style.display="none",s.insertBefore(i,s.firstChild),i.src="javascript:",t=i.contentWindow,t.Object||(r=t.document,r.open(),r.write("<script></script>"),r.close()),e=function(){},e[n]=t.Object[n],s.removeChild(i),r=s=i=null;for(c=0;c<l.length;delete e[n][l[c++]]);return new e};return function(t){return t?C(t):new e}}(),m=e.setPrototypeOf||({__proto__:null}instanceof e?function(e,t){return L(v(t),e)}:function(e,t){return e.__proto__=t,e}),g=k[n],y,b,w,E;if(u){E=f(s({},"_",{get:function(){return++c,s(this,"_",{value:!1})._}}));try{y=E._||E._}catch(H){y=!0}b=1===c}return w={Null:function B(){function B(){}return B.prototype=v(null),w.Null=B,new B},Class:u?o(function(r,i){var s=i!=null,u=s&&D(r),a=s?_(u,i):r||{},l=M(a=d(a).reduce(O,a),A).value;return(s?l[n]=f(u,a):o(l[n],a))[t]},{bound:{value:function(t){return new S(t)}},descriptor:{value:function(t){return new x(t)}},lazy:{value:function(t){return new T(t)}}}):function(i,s){var o=s!=null,u=o&&D(i),a=o?_(u,s):i||{},f=M(a,e);return(f[n]=o?L(v(u),a):a)[t]},copy:L,create:function(e,t){return t==null?v(e):m(t,e)},keys:d}}(Object);
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
  Class = prototypal.Class,
  Null = prototypal.Null
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
  }, {
    name: 'Null',
    test: function () {
      var d = new Null;
      wru.assert('not an Object', !(d instanceof Object));
    }
  }
] :
[]
));

