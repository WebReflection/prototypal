/*! (C) Andrea Giammarchi Mit Style License */
this.prototypal=function(e){"use strict";function p(e){d[n]=e;var t=new d;return d[n]=h,t}function d(){}function v(e,t){for(var n in t)u.call(t,n)&&(e[n]=t[n]);if(o)for(s=0;s<i.length;s++)u.call(t,n=i[s])&&(e[n]=t[n]);return e}var t="constructor",n="prototype",r="__proto__",i=[t,"hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],s=0,o=!{valueOf:0}[i[3]](i[6]),u={}[i[1]],a=e.keys||function(e){var t=[],n;for(n in e)u.call(e,n)&&t.push(n);if(o)for(s=0;s<i.length;s++)u.call(e,n=i[s])&&t.push(n);return t},f=e.create,l=f?function(e){return e[1]=1,u.call(e,1)?f:p}(f(e[n])):function(){var e=function(){var t,r=document,o=r.createElement("iframe"),u=r.body||r.documentElement;o.style.display="none",u.insertBefore(o,u.firstChild),o.src="javascript:",t=o.contentWindow,t.Object||(r=t.document,r.open(),r.write("<script></script>"),r.close()),e=function(){},e[n]=t.Object[n],u.removeChild(o),r=u=o=null;for(s=0;s<i.length;delete e[n][i[s++]]);return new e};return function(t){return t?p(t):new e}}(),c=e.setPrototypeOf||({__proto__:null}instanceof e?function(e,t){return v(l(t),e)}:function(e,t){return e.__proto__=t,e}),h=d[n];return{Class:function(e,r){var i=r!=null,s=i?r:e,o=u.call(s,t)?s[t]:s[t]=function(){};return(o[n]=i?v(l(typeof e=="function"?e[n]:e),r):s)[t]},copy:v,create:function(e,t){return t==null?l(e):c(t,e)},keys:a}}(Object);