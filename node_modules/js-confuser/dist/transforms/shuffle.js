"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var t = _interopRequireWildcard(require("@babel/types"));
var _randomUtils = require("../utils/random-utils");
var _template = _interopRequireDefault(require("../templates/template"));
var _order = require("../order");
var _staticUtils = require("../utils/static-utils");
var _constants = require("../constants");
var _node = require("../utils/node");
var _astUtils = require("../utils/ast-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var _default = exports["default"] = function _default(_ref) {
  var Plugin = _ref.Plugin;
  var me = Plugin(_order.Order.Shuffle, {
    changeData: {
      arrays: 0
    }
  });
  var fnName = null;
  return {
    visitor: {
      ArrayExpression: {
        exit: function exit(path) {
          if (path.node.elements.length <= 3) {
            return;
          }
          var illegalElement = path.node.elements.find(function (element) {
            return !(0, _staticUtils.isStaticValue)(element);
          });
          if (illegalElement) return;
          if (!me.computeProbabilityMap(me.options.shuffle)) {
            return;
          }

          // Create un-shuffling function
          if (!fnName) {
            fnName = me.getPlaceholder() + "_shuffle";
            (0, _astUtils.prependProgram)(path, new _template["default"]("\n          function ".concat(fnName, "(arr, shift) {\n            for (var i = 0; i < shift; i++) {\n              arr[\"push\"](arr[\"shift\"]());\n            }\n            return arr;\n          }\n          ")).addSymbols(_constants.PREDICTABLE).single());
          }
          var shift = (0, _randomUtils.getRandomInteger)(1, Math.min(30, path.node.elements.length * 6));
          var shiftedElements = _toConsumableArray(path.node.elements);
          for (var i = 0; i < shift; i++) {
            shiftedElements.unshift(shiftedElements.pop());
          }
          path.replaceWith(t.callExpression(t.identifier(fnName), [t.arrayExpression(shiftedElements), (0, _node.numericLiteral)(shift)]));
          path.skip();
          me.changeData.arrays++;
        }
      }
    }
  };
};