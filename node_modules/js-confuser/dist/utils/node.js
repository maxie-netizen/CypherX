"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLiteral = void 0;
exports.deepClone = deepClone;
exports.numericLiteral = numericLiteral;
var t = _interopRequireWildcard(require("@babel/types"));
var _assert = require("assert");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var createLiteral = exports.createLiteral = function createLiteral(value) {
  if (value === null) return t.nullLiteral();
  if (value === undefined) return t.identifier("undefined");
  switch (_typeof(value)) {
    case "string":
      return t.stringLiteral(value);
    case "number":
      return numericLiteral(value);
    case "boolean":
      return t.booleanLiteral(value);
  }
  (0, _assert.ok)(false);
};

/**
 * Handles both positive and negative numeric literals
 * @param value
 * @returns
 */
function numericLiteral(value) {
  (0, _assert.ok)(typeof value === "number");
  if (value < 0) {
    return t.unaryExpression("-", t.numericLiteral(-value));
  }
  return t.numericLiteral(value);
}
function deepClone(node) {
  function deepClone(obj) {
    // Handle non-objects like null, undefined, primitive values, or functions
    if (obj === null || _typeof(obj) !== "object") {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      return new Date(obj);
    }

    // Handle Array
    if (Array.isArray(obj)) {
      return obj.map(deepClone);
    }

    // Handle Objects
    var clonedObj = {};

    // Handle string and symbol property keys

    Object.getOwnPropertyNames(obj).forEach(function (key) {
      var value = obj[key];
      clonedObj[key] = deepClone(value);
    });

    // Copy simple symbols (Avoid objects = infinite recursion)
    Object.getOwnPropertySymbols(obj).forEach(function (symbol) {
      var value = obj[symbol];
      if (_typeof(value) !== "object") {
        clonedObj[symbol] = deepClone(value);
      }
    });
    return clonedObj;
  }
  return deepClone(node);
}