"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var t = _interopRequireWildcard(require("@babel/types"));
var _assert = require("assert");
var _order = require("../../order");
var _astUtils = require("../../utils/ast-utils");
var _node = require("../../utils/node");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function fail() {
  throw new Error("Assertion failed");
}
var _default = exports["default"] = function _default(_ref) {
  var Plugin = _ref.Plugin;
  var me = Plugin(_order.Order.DuplicateLiteralsRemoval, {
    changeData: {
      literals: 0
    }
  });
  return {
    visitor: {
      Program: {
        enter: function enter(programPath) {
          var arrayName = me.getPlaceholder() + "_dlrArray";

          // Collect all literals
          var literalsMap = new Map();
          var firstTimeMap = new Map();
          var arrayExpression = t.arrayExpression([]);
          var createMemberExpression = function createMemberExpression(index) {
            return t.memberExpression(t.identifier(arrayName), (0, _node.numericLiteral)(index), true);
          };

          // Traverse through all nodes to find literals
          programPath.traverse({
            "StringLiteral|BooleanLiteral|NumericLiteral|NullLiteral|Identifier": function StringLiteralBooleanLiteralNumericLiteralNullLiteralIdentifier(_path) {
              var literalPath = _path;

              // Don't change module imports
              if (literalPath.isStringLiteral()) {
                if ((0, _astUtils.isModuleImport)(literalPath)) return;
              }
              var node = literalPath.node;
              var isUndefined = false;
              if (literalPath.isIdentifier()) {
                // Only referenced variable names
                if (!literalPath.isReferencedIdentifier()) return;

                // undefined = true; // Skip
                if (literalPath.isBindingIdentifier()) return;

                // Allow 'undefined' to be redefined
                if (literalPath.scope.hasBinding(literalPath.node.name, {
                  noGlobals: true
                })) return;
                if (literalPath.node.name === "undefined") {
                  isUndefined = true;
                } else {
                  return;
                }
              }
              if (t.isRegExpLiteral(node) || t.isTemplateLiteral(node) || t.isDirectiveLiteral(node)) return;
              var value = isUndefined ? undefined : t.isNullLiteral(node) ? null : t.isLiteral(node) ? node.value : fail();
              if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean" && value !== null && value !== undefined) {
                return;
              }

              // Skip empty strings
              if (typeof value === "string" && value.length === 0) return;
              var index = -1;
              if (literalsMap.has(value)) {
                index = literalsMap.get(value);
              } else if (firstTimeMap.has(value)) {
                // Create new index

                index = literalsMap.size;
                literalsMap.set(value, index);
                var firstPath = firstTimeMap.get(value);
                me.changeData.literals++;
                (0, _astUtils.ensureComputedExpression)(firstPath);
                firstPath.replaceWith(createMemberExpression(index));
                arrayExpression.elements.push((0, _node.createLiteral)(value));
              } else {
                firstTimeMap.set(value, literalPath);
                return;
              }
              (0, _assert.ok)(index !== -1);
              me.changeData.literals++;
              (0, _astUtils.ensureComputedExpression)(literalPath);
              literalPath.replaceWith(createMemberExpression(index));
              literalPath.skip();
            }
          });
          if (arrayExpression.elements.length === 0) return;

          // Create the literals array declaration
          var itemsArrayDeclaration = t.variableDeclaration("const", [t.variableDeclarator(t.identifier(arrayName), arrayExpression)]);
          (0, _astUtils.prepend)(programPath, itemsArrayDeclaration);
        }
      }
    }
  };
};