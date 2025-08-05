"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function walk(astNode, _ref) {
  var enter = _ref.enter,
      leave = _ref.leave;
  // console.log(astNode)
  visit(astNode, null, enter, leave);
}

;

function visit(node, parent, enter, leave) {
  if (enter) {
    enter.call(null, node, parent);
  }

  var keys = Object.keys(node).filter(function (key) {
    return _typeof(node[key]) === "object";
  }); //   console.log(keys)

  keys.forEach(function (key) {
    var value = node[key];

    if (Array.isArray(value)) {
      value.forEach(function (item, index) {
        visit(item, node, enter, leave);
      });
    } else if (value && value.type) {
      visit(value, node, enter, leave);
    }
  });

  if (leave) {
    leave.call(null, node, parent);
  }
}

module.exports = walk;