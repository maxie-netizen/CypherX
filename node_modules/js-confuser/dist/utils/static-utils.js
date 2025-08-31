"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStaticValue = isStaticValue;
var t = _interopRequireWildcard(require("@babel/types"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Function to check if a node is a static value
function isStaticValue(node) {
  // Check for literals which are considered static
  if (t.isStringLiteral(node) || t.isNumericLiteral(node) || t.isBooleanLiteral(node) || t.isNullLiteral(node)) {
    if (t.isDirectiveLiteral(node)) return false;
    return true;
  }

  // Handle unary expressions like -42
  if (t.isUnaryExpression(node)) {
    // Only consider certain operators as static (e.g., -, +)
    if (["-", "+", "!", "~", "void"].includes(node.operator)) {
      return isStaticValue(node.argument);
    }
    return false;
  }

  // Handle binary expressions with static values only
  if (t.isBinaryExpression(node)) {
    return isStaticValue(node.left) && isStaticValue(node.right);
  }

  // Handle logical expressions (&&, ||) with static values only
  if (t.isLogicalExpression(node)) {
    return isStaticValue(node.left) && isStaticValue(node.right);
  }

  // Handle conditional (ternary) expressions with static values
  if (t.isConditionalExpression(node)) {
    return isStaticValue(node.test) && isStaticValue(node.consequent) && isStaticValue(node.alternate);
  }

  // Handle array expressions where all elements are static
  if (t.isArrayExpression(node)) {
    return node.elements.every(function (element) {
      return element !== null && isStaticValue(element);
    });
  }

  // Handle object expressions where all properties are static
  if (t.isObjectExpression(node)) {
    return node.properties.every(function (prop) {
      if (t.isObjectProperty(prop)) {
        return isStaticValue(prop.key) && isStaticValue(prop.value);
      } else if (t.isSpreadElement(prop)) {
        return isStaticValue(prop.argument);
      }
      return false;
    });
  }

  // Add more cases as needed, depending on what you consider "static"
  return false;
}