/*! (C) Andrea Giammarchi Mit Style License */
define(function(e,t,n){n.exports=function(e){"use strict";function d(e){this._=e}function v(e){this._=e}function m(e){this._=e}function g(e){return{value:e,configurable:!0,writable:!0}}function y(e,t){var r=e[t]._;return e[t]._=function(){return n.call(r,this)},b(e,t,r)}function b(e,n,r){var s=e[n]._;return{configurable:!0,get:function(){var f=this,l=f,p;if(a.call(f,t))return r||s;if(c){while(!p&&(l=u(l)))p=o(l,n);delete l[n]}return(h||!a.call(f,n))&&i(f,n,{configurable:!0,value:s.call(f)}),c&&i(l,n,p),f[n]}}}function w(e,t){var n=e[t];return n instanceof d?e[t]=y(e,t):n instanceof v?e[t]=n._:n instanceof m?e[t]=b(e,t):e[t]=g(n),e}function E(e,n){var o,u=n!=null,o=f(o=u?n:e).reduce(w,o),l=(a.call(o,t)?o[t]:i(o,t,{enumerable:!0,value:g(function(){})})[t]).value;return(u?l.prototype=r(typeof e=="function"?e.prototype:e,o):s(l.prototype,o))[t]}var t="constructor",n=e.bind||function(e,t){return t=this,function(){return t.apply(e,arguments)}},r=e.create,i=e.defineProperty,s=e.defineProperties,o=e.getOwnPropertyDescriptor,u=e.getPrototypeOf,a=e.prototype.hasOwnProperty,f=e.keys,l=0,c,h,p;p=r(i({},"_",{get:function(){return++l,i(this,"_",{value:!1})._}}));try{c=p._||p._}catch(S){c=!0}return h=1===l,s(E,{Class:{value:E},bound:{value:function(e){return new d(e)}},descriptor:{value:function(e){return new v(e)}},lazy:{value:function(e){return new m(e)}}})}(Object)});