'use strict';

var AIGCVis = require('aigc-vis');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var AIGCVis__namespace = /*#__PURE__*/_interopNamespace(AIGCVis);

function main() {
  console.log("Hello from my-aigc-project!", AIGCVis__namespace);
}

main();
