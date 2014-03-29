/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2014 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */
 (function(u,w){"function"===typeof define&&define.amd?define(w):"object"===typeof exports?module.exports=w():u.returnExports=w()})(this,function(){function u(){}function w(c){c=+c;c!==c?c=0:0!==c&&c!==1/0&&c!==-(1/0)&&(c=(0<c||-1)*Math.floor(Math.abs(c)));return c}function r(c){var e=typeof c;return null===c||"undefined"===e||"boolean"===e||"number"===e||"string"===e}Function.prototype.bind||(Function.prototype.bind=function(c){var e=this;if("function"!=typeof e)throw new TypeError("Function.prototype.bind called on incompatible "+
 e);for(var a=v.call(arguments,1),b=Math.max(0,e.length-a.length),f=[],h=0;h<b;h++)f.push("$"+h);var t=Function("binder","return function("+f.join(",")+"){return binder.apply(this,arguments)}")(function(){if(this instanceof t){var b=e.apply(this,a.concat(v.call(arguments)));return Object(b)===b?b:this}return e.apply(c,a.concat(v.call(arguments)))});e.prototype&&(u.prototype=e.prototype,t.prototype=new u,u.prototype=null);return t});var d=Function.prototype.call,s=Object.prototype,v=Array.prototype.slice,
 m=d.bind(s.toString),y=d.bind(s.hasOwnProperty);y(s,"__defineGetter__")&&(d.bind(s.__defineGetter__),d.bind(s.__defineSetter__),d.bind(s.__lookupGetter__),d.bind(s.__lookupSetter__));if(2!=[1,2].splice(0).length){var z=Array.prototype.splice,B=Array.prototype.push,A=Array.prototype.unshift;(function(){function c(c){for(var e=[];c--;)e.unshift(c);return e}var e=[],a;e.splice.bind(e,0,0).apply(null,c(20));e.splice.bind(e,0,0).apply(null,c(26));a=e.length;e.splice(5,0,"XXX");if(a+1==e.length)return!0})()?
 Array.prototype.splice=function(c,e){return arguments.length?z.apply(this,[void 0===c?0:c,void 0===e?this.length-c:e].concat(v.call(arguments,2))):[]}:Array.prototype.splice=function(c,e){var a,b=v.call(arguments,2);a=b.length;if(!arguments.length)return[];void 0===c&&(c=0);void 0===e&&(e=this.length-c);if(0<a){if(0>=e){if(c==this.length)return B.apply(this,b),[];if(0==c)return A.apply(this,b),[]}a=v.call(this,c,c+e);b.push.apply(b,v.call(this,c+e,this.length));b.unshift.apply(b,v.call(this,0,c));
 b.unshift(0,this.length);z.apply(this,b);return a}return z.call(this,c,e)}}1!=[].unshift(0)&&(A=Array.prototype.unshift,Array.prototype.unshift=function(){A.apply(this,arguments);return this.length});Array.isArray||(Array.isArray=function(c){return"[object Array]"==m(c)});var d=Object("a"),p="a"!=d[0]||!(0 in d),d=function(c){var e=!0;c&&c.call("foo",function(c,b,a){"object"!==typeof a&&(e=!1)});return!!c&&e};Array.prototype.forEach&&d(Array.prototype.forEach)||(Array.prototype.forEach=function(c,
 e){var a=x(this),b=p&&"[object String]"==m(this)?this.split(""):a,f=-1,h=b.length>>>0;if("[object Function]"!=m(c))throw new TypeError;for(;++f<h;)f in b&&c.call(e,b[f],f,a)});Array.prototype.map&&d(Array.prototype.map)||(Array.prototype.map=function(c,e){var a=x(this),b=p&&"[object String]"==m(this)?this.split(""):a,f=b.length>>>0,h=Array(f);if("[object Function]"!=m(c))throw new TypeError(c+" is not a function");for(var t=0;t<f;t++)t in b&&(h[t]=c.call(e,b[t],t,a));return h});Array.prototype.filter&&
 d(Array.prototype.filter)||(Array.prototype.filter=function(c,e){var a=x(this),b=p&&"[object String]"==m(this)?this.split(""):a,f=b.length>>>0,h=[],t;if("[object Function]"!=m(c))throw new TypeError(c+" is not a function");for(var n=0;n<f;n++)n in b&&(t=b[n],c.call(e,t,n,a)&&h.push(t));return h});Array.prototype.every&&d(Array.prototype.every)||(Array.prototype.every=function(c,e){var a=x(this),b=p&&"[object String]"==m(this)?this.split(""):a,f=b.length>>>0;if("[object Function]"!=m(c))throw new TypeError(c+
 " is not a function");for(var h=0;h<f;h++)if(h in b&&!c.call(e,b[h],h,a))return!1;return!0});Array.prototype.some&&d(Array.prototype.some)||(Array.prototype.some=function(c,e){var a=x(this),b=p&&"[object String]"==m(this)?this.split(""):a,f=b.length>>>0;if("[object Function]"!=m(c))throw new TypeError(c+" is not a function");for(var h=0;h<f;h++)if(h in b&&c.call(e,b[h],h,a))return!0;return!1});Array.prototype.reduce||(Array.prototype.reduce=function(c){var e=x(this),a=p&&"[object String]"==m(this)?
 this.split(""):e,b=a.length>>>0;if("[object Function]"!=m(c))throw new TypeError(c+" is not a function");if(!b&&1==arguments.length)throw new TypeError("reduce of empty array with no initial value");var f=0,h;if(2<=arguments.length)h=arguments[1];else{do{if(f in a){h=a[f++];break}if(++f>=b)throw new TypeError("reduce of empty array with no initial value");}while(1)}for(;f<b;f++)f in a&&(h=c.call(void 0,h,a[f],f,e));return h});Array.prototype.reduceRight||(Array.prototype.reduceRight=function(c){var e=
 x(this),a=p&&"[object String]"==m(this)?this.split(""):e,b=a.length>>>0;if("[object Function]"!=m(c))throw new TypeError(c+" is not a function");if(!b&&1==arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var f,b=b-1;if(2<=arguments.length)f=arguments[1];else{do{if(b in a){f=a[b--];break}if(0>--b)throw new TypeError("reduceRight of empty array with no initial value");}while(1)}if(0>b)return f;do b in this&&(f=c.call(void 0,f,a[b],b,e));while(b--);return f});
 Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)||(Array.prototype.indexOf=function(c){var a=p&&"[object String]"==m(this)?this.split(""):x(this),k=a.length>>>0;if(!k)return-1;var b=0;1<arguments.length&&(b=w(arguments[1]));for(b=0<=b?b:Math.max(0,k+b);b<k;b++)if(b in a&&a[b]===c)return b;return-1});Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)||(Array.prototype.lastIndexOf=function(c){var a=p&&"[object String]"==m(this)?this.split(""):x(this),k=a.length>>>0;if(!k)return-1;var b=k-1;1<arguments.length&&
 (b=Math.min(b,w(arguments[1])));for(b=0<=b?b:k-Math.abs(b);0<=b;b--)if(b in a&&c===a[b])return b;return-1});if(!Object.keys){var E=!0,D=function(){}.propertyIsEnumerable("prototype"),C="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),F=C.length,a;for(a in{toString:null})E=!1;Object.keys=function(c){var a="[object Function]"===m(c);if((null===c||"object"!==typeof c)&&!a)throw new TypeError("Object.keys called on a non-object");var k=[],a=D&&
 a,b;for(b in c)a&&"prototype"===b||!y(c,b)||k.push(b);if(E)for(b=(b=c.constructor)&&b.prototype===c,a=0;a<F;a++){var f=C[a];b&&"constructor"===f||!y(c,f)||k.push(f)}return k}}Date.prototype.toISOString&&-1!==(new Date(-621987552E5)).toISOString().indexOf("-000001")||(Date.prototype.toISOString=function(){var c,a,k,b;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");b=this.getUTCFullYear();c=this.getUTCMonth();b+=Math.floor(c/12);c=[(c%12+12)%12+1,this.getUTCDate(),
 this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];b=(0>b?"-":9999<b?"+":"")+("00000"+Math.abs(b)).slice(0<=b&&9999>=b?-4:-6);for(a=c.length;a--;)k=c[a],10>k&&(c[a]="0"+k);return b+"-"+c.slice(0,2).join("-")+"T"+c.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"});a=!1;try{a=Date.prototype.toJSON&&null===(new Date(NaN)).toJSON()&&-1!==(new Date(-621987552E5)).toJSON().indexOf("-000001")&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(k){}a||(Date.prototype.toJSON=
 function(c){c=Object(this);var a;a:if(r(c))a=c;else{a=c.valueOf;if("function"===typeof a&&(a=a.call(c),r(a)))break a;a=c.toString;if("function"===typeof a&&(a=a.call(c),r(a)))break a;throw new TypeError;}if("number"===typeof a&&!isFinite(a))return null;a=c.toISOString;if("function"!=typeof a)throw new TypeError("toISOString property is not callable");return a.call(c)});Date=function(a){function e(b,n,g,k,f,h,l){var d=arguments.length;return this instanceof a?(d=1==d&&String(b)===b?new a(e.parse(b)):
 7<=d?new a(b,n,g,k,f,h,l):6<=d?new a(b,n,g,k,f,h):5<=d?new a(b,n,g,k,f):4<=d?new a(b,n,g,k):3<=d?new a(b,n,g):2<=d?new a(b,n):1<=d?new a(b):new a,d.constructor=e,d):a.apply(this,arguments)}function k(a,c){var b=1<c?1:0;return f[c]+Math.floor((a-1969+b)/4)-Math.floor((a-1901+b)/100)+Math.floor((a-1601+b)/400)+365*(a-1970)}var b=RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),f=[0,31,59,90,120,151,181,
 212,243,273,304,334,365],h;for(h in a)e[h]=a[h];e.now=a.now;e.UTC=a.UTC;e.prototype=a.prototype;e.prototype.constructor=e;e.parse=function(e){var n=b.exec(e);if(n){var g=Number(n[1]),f=Number(n[2]||1)-1,h=Number(n[3]||1)-1,d=Number(n[4]||0),l=Number(n[5]||0),q=Number(n[6]||0),m=Math.floor(1E3*Number(n[7]||0)),s=Boolean(n[4]&&!n[8]),r="-"===n[9]?1:-1,p=Number(n[10]||0),n=Number(n[11]||0);return d<(0<l||0<q||0<m?24:25)&&60>l&&60>q&&1E3>m&&-1<f&&12>f&&24>p&&60>n&&-1<h&&h<k(g,f+1)-k(g,f)&&(g=60*(24*(k(g,
 f)+h)+d+p*r),g=1E3*(60*(g+l+n*r)+q)+m,s&&(g=Number(new a(1970,0,1,0,0,0,g))),-864E13<=g&&864E13>=g)?g:NaN}return a.parse.apply(this,arguments)};return e}(Date);Date.now||(Date.now=function(){return(new Date).getTime()});Number.prototype.toFixed&&"0.000"===(8E-5).toFixed(3)&&"0"!==(0.9).toFixed(0)&&"1.25"===(1.255).toFixed(2)&&"1000000000000000128"===(0xde0b6b3a7640080).toFixed(0)||function(){function a(b,c){for(var e=-1;++e<h;)c+=b*d[e],d[e]=c%f,c=Math.floor(c/f)}function e(a){for(var c=h,b=0;0<=
 --c;)b+=d[c],d[c]=Math.floor(b/a),b=b%a*f}function k(){for(var a=h,c="";0<=--a;)if(""!==c||0===a||0!==d[a])var b=String(d[a]),c=""===c?b:c+("0000000".slice(0,7-b.length)+b);return c}function b(a,c,e){return 0===c?e:1===c%2?b(a,c-1,e*a):b(a*a,c/2,e)}var f,h,d;f=1E7;h=6;d=[0,0,0,0,0,0];Number.prototype.toFixed=function(f){var g,h,d;f=Number(f);f=f!==f?0:Math.floor(f);if(0>f||20<f)throw new RangeError("Number.toFixed called with invalid number of decimals");g=Number(this);if(g!==g)return"NaN";if(-1E21>=
 g||1E21<=g)return String(g);h="";0>g&&(h="-",g=-g);d="0";if(1E-21<g){d=g*b(2,69,1);for(var l=0;4096<=d;)l+=12,d/=4096;for(;2<=d;)l+=1,d/=2;d=l-69;g=0>d?g*b(2,-d,1):g/b(2,d,1);g*=4503599627370496;d=52-d;if(0<d){a(0,g);for(g=f;7<=g;)a(1E7,0),g-=7;a(b(10,g,1),0);for(g=d-1;23<=g;)e(8388608),g-=23;e(1<<g);a(1,1);e(2);d=k()}else a(0,g),a(1<<-d,0),d=k()+"0.00000000000000000000".slice(2,2+f)}0<f?(g=d.length,d=g<=f?h+"0.0000000000000000000".slice(0,f-g+2)+d:h+d.slice(0,g-f)+"."+d.slice(g-f)):d=h+d;return d}}();
 var q=String.prototype.split;2!=="ab".split(/(?:ab)*/).length||4!==".".split(/(.?)(.?)/).length||"t"==="tesst".split(/(s)*/)[1]||"".split(/.?/).length||1<".".split(/()()/).length?function(){var a=void 0===/()??/.exec("")[1];String.prototype.split=function(e,d){var b=this;if(void 0===e&&0===d)return[];if("[object RegExp]"!==Object.prototype.toString.call(e))return q.apply(this,arguments);var f=[],k=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),l=0;e=RegExp(e.source,
 k+"g");var n,g,m,b=b+"";a||(n=RegExp("^"+e.source+"$(?!\\s)",k));for(d=void 0===d?4294967295:d>>>0;g=e.exec(b);){k=g.index+g[0].length;if(k>l&&(f.push(b.slice(l,g.index)),!a&&1<g.length&&g[0].replace(n,function(){for(var a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(g[a]=void 0)}),1<g.length&&g.index<b.length&&Array.prototype.push.apply(f,g.slice(1)),m=g[0].length,l=k,f.length>=d))break;e.lastIndex===g.index&&e.lastIndex++}l===b.length?!m&&e.test("")||f.push(""):f.push(b.slice(l));return f.length>
 d?f.slice(0,d):f}}():"0".split(void 0,0).length&&(String.prototype.split=function(a,e){return void 0===a&&0===e?[]:q.apply(this,arguments)});if("".substr&&"b"!=="0b".substr(-1)){var l=String.prototype.substr;String.prototype.substr=function(a,e){return l.call(this,0>a?0>(a=this.length+a)?0:a:a,e)}}a="\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff";if(!String.prototype.trim||a.trim()){a="["+a+"]";var G=RegExp("^"+
 a+a+"*"),H=RegExp(a+a+"*$");String.prototype.trim=function(){if(void 0===this||null===this)throw new TypeError("can't convert "+this+" to object");return String(this).replace(G,"").replace(H,"")}}if(8!==parseInt(a+"08")||22!==parseInt(a+"0x16"))parseInt=function(a){var e=/^0[xX]/;return function(d,b){d=String(d).trim();+b||(b=e.test(d)?16:10);return a(d,b)}}(parseInt);var x=function(a){if(null==a)throw new TypeError("can't convert "+a+" to object");return Object(a)}});
 (function(u){"function"==typeof define?define(u):"function"==typeof YUI?YUI.add("es5-sham",u):u()})(function(){function u(a){try{return a.sentinel=0,0===Object.getOwnPropertyDescriptor(a,"sentinel").value}catch(d){}}function w(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(d){}}var r=Function.prototype.call,d=Object.prototype,s=r.bind(d.hasOwnProperty),v,m,y,z,B;if(B=s(d,"__defineGetter__"))v=r.bind(d.__defineGetter__),m=r.bind(d.__defineSetter__),y=r.bind(d.__lookupGetter__),
 z=r.bind(d.__lookupSetter__);Object.getPrototypeOf||(Object.getPrototypeOf=function(a){return a.__proto__||(a.constructor?a.constructor.prototype:d)});if(Object.defineProperty&&(r=u({}),"undefined"!=typeof document&&!u(document.createElement("div"))||!r))var A=Object.getOwnPropertyDescriptor;if(!Object.getOwnPropertyDescriptor||A)Object.getOwnPropertyDescriptor=function(a,k){if("object"!=typeof a&&"function"!=typeof a||null===a)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+
 a);if(A)try{return A.call(Object,a,k)}catch(q){}if(s(a,k)){var l={enumerable:!0,configurable:!0};if(B){var m=a!==d,r=a.__proto__;m&&(a.__proto__=d);var p=y(a,k),c=z(a,k);m&&(a.__proto__=r);if(p||c)return p&&(l.get=p),c&&(l.set=c),l}l.value=a[k];l.writable=!0;return l}};Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(a){return Object.keys(a)});if(!Object.create){var p;p="undefined"==typeof document?function(){return{__proto__:null}}:function(){function a(){}var d=document.createElement("iframe"),
 m=document.body||document.documentElement;d.style.display="none";m.appendChild(d);d.src="javascript:";var l=d.contentWindow.Object.prototype;m.removeChild(d);d=null;delete l.constructor;delete l.hasOwnProperty;delete l.propertyIsEnumerable;delete l.isPrototypeOf;delete l.toLocaleString;delete l.toString;delete l.valueOf;l.__proto__=null;a.prototype=l;p=function(){return new a};return new a};Object.create=function(a,d){function m(){}var l;if(null===a)l=p();else{if("object"!==typeof a&&"function"!==
 typeof a)throw new TypeError("Object prototype may only be an Object or null");m.prototype=a;l=new m;l.__proto__=a}void 0!==d&&Object.defineProperties(l,d);return l}}if(Object.defineProperty){var r=w({}),E="undefined"==typeof document||w(document.createElement("div"));if(!r||!E)var D=Object.defineProperty,C=Object.defineProperties}if(!Object.defineProperty||D)Object.defineProperty=function(a,k,q){if("object"!=typeof a&&"function"!=typeof a||null===a)throw new TypeError("Object.defineProperty called on non-object: "+
 a);if("object"!=typeof q&&"function"!=typeof q||null===q)throw new TypeError("Property description must be an object: "+q);if(D)try{return D.call(Object,a,k,q)}catch(l){}if(s(q,"value"))if(B&&(y(a,k)||z(a,k))){var p=a.__proto__;a.__proto__=d;delete a[k];a[k]=q.value;a.__proto__=p}else a[k]=q.value;else{if(!B)throw new TypeError("getters & setters can not be defined on this javascript engine");s(q,"get")&&v(a,k,q.get);s(q,"set")&&m(a,k,q.set)}return a};if(!Object.defineProperties||C)Object.defineProperties=
 function(a,d){if(C)try{return C.call(Object,a,d)}catch(m){}for(var l in d)s(d,l)&&"__proto__"!=l&&Object.defineProperty(a,l,d[l]);return a};Object.seal||(Object.seal=function(a){return a});Object.freeze||(Object.freeze=function(a){return a});try{Object.freeze(function(){})}catch(F){Object.freeze=function(a){return function(d){return"function"==typeof d?d:a(d)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(a){return a});Object.isSealed||(Object.isSealed=function(a){return!1});
 Object.isFrozen||(Object.isFrozen=function(a){return!1});Object.isExtensible||(Object.isExtensible=function(a){if(Object(a)!==a)throw new TypeError;for(var d="";s(a,d);)d+="?";a[d]=!0;var m=s(a,d);delete a[d];return m})});