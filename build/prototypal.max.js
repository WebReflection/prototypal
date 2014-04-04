/*!
Copyright (C) 2014 by Andrea Giammarchi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
this.create = function(Object){'use strict';
  // (C) Andrea Giammarchi
  var
    PROTOTYPE = 'prototype',
    inherited = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ],
    i = 0,
    // hasOwnProperty shortcut
    has = {}[inherited[1]],
    // IE only bug
    enumerableBug = !{valueOf:0}[inherited[3]](inherited[6]),
    // native or concretely polyfilled with one argument only
    // do not include other polyfills before this file
    // or compatibility might be compromised
    create = Object.create || (function(){
      var
        constructor = function () {},
        proto = constructor[PROTOTYPE],
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
        var r;
        if (p) {  // extending
          constructor[PROTOTYPE] = p;
          r = new constructor;
          constructor[PROTOTYPE] = proto;
        } else {  // null object
          r = new Null;
        }
        return r;
      };
    }()),
    set = Object.setPrototypeOf || (
      // Opera Mini proof check
      {__proto__:null} instanceof Object ?
      // __proto__ does not work
      function (o, p) {
        var r = create(p), k;
        for (k in o) {
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
      } :
      // proto does work
      function (o, p) {
        o.__proto__ = p;
        return o;
      }
    )
  ;
  return function (p, o) {
    return o == null ? create(p) : set(o, p);
  };
}(Object);