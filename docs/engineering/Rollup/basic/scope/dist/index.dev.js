"use strict";

var Scope = require("./Scope");

var a = 1;

function b() {
  var b = 2;
  return function () {
    var c = 3;
    console.log(a, b, c);
  };
}

var globalScope = new Scope({
  name: "global",
  scopes: ['a'],
  parent: null
});
var oneScope = new Scope({
  name: "one",
  scopes: ["b"],
  parent: globalScope
});
var twoScope = new Scope({
  name: "two",
  scopes: ["c"],
  parent: oneScope
});
console.log(twoScope.findDefiningScope("a").name, twoScope.findDefiningScope("b").name, twoScope.findDefiningScope("c").name);