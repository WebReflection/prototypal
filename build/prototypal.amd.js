/*! (C) Andrea Giammarchi Mit Style License */
define(function(e,t,n){n.exports=function(e){"use strict";function l(e,t){for(var n in t)o.call(t,n)&&(e[n]=t[n]);if(u)for(s=0;s<i.length;s++)o.call(t,n=i[s])&&(e[n]=t[n]);return e}var t="constructor",n="prototype",r="__proto__",i=[t,"hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],s=0,o={}[i[1]],u=!{valueOf:0}[i[3]](i[6]),a=e.create||function(){var e=function(){},t=e[n],r=function(){var e,t=document,o=t.createElement("iframe"),u=t.body||t.documentElement;o.style.display="none",u.insertBefore(o,u.firstChild),o.src="javascript:",e=o.contentWindow,e.Object||(t=e.document,t.open(),t.write("<script></script>"),t.close()),r=function(){},r[n]=e.Object[n],u.removeChild(o),t=u=o=null;for(s=0;s<i.length;delete r[n][i[s++]]);return new r};return function(i){var s;return i?(e[n]=i,s=new e,e[n]=t):s=new r,s}}(),f=e.setPrototypeOf||({__proto__:null}instanceof e?function(e,t){return l(a(t),e)}:function(e,t){return e.__proto__=t,e});return{Class:function(e,r){var i=r!=null,s=i?r:e,u=o.call(s,t)?s[t]:s[t]=function(){};return(u[n]=i?l(a(typeof e=="function"?e[n]:e),r):s)[t]},copy:l,create:function(e,t){return t==null?a(e):f(t,e)},keys:e.keys||function(e){var t=[],n;for(n in e)o.call(e,n)&&t.push(n);if(u)for(s=0;s<i.length;s++)o.call(e,n=i[s])&&t.push(n);return t}}}(Object)});