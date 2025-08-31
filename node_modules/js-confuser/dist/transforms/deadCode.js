"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _randomUtils = require("../utils/random-utils");
var _deadCodeTemplates = require("../templates/deadCodeTemplates");
var _order = require("../order");
var t = _interopRequireWildcard(require("@babel/types"));
var _template = _interopRequireDefault(require("../templates/template"));
var _astUtils = require("../utils/ast-utils");
var _PredicateGen = _interopRequireDefault(require("../utils/PredicateGen"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _default = exports["default"] = function _default(_ref) {
  var Plugin = _ref.Plugin;
  var me = Plugin(_order.Order.DeadCode, {
    changeData: {
      deadCode: 0
    }
  });
  var predicateGen = new _PredicateGen["default"](me);
  return {
    visitor: {
      Block: {
        exit: function exit(blockPath) {
          if (blockPath.find(function (p) {
            return me.isSkipped(p);
          })) return;
          if (!me.computeProbabilityMap(me.options.deadCode)) {
            return;
          }

          // Default limit on dead code
          // May be overridden by user
          if (typeof me.options.deadCode !== "function" && _typeof(me.options.deadCode) !== "object") {
            var suggestedMax = 20;
            if (me.obfuscator.parentObfuscator) {
              // RGF should contain less dead code
              suggestedMax = 5;
            }
            if (me.changeData.deadCode >= suggestedMax) {
              return;
            }
          }

          // Increment dead code counter
          me.changeData.deadCode++;
          var template = (0, _randomUtils.choice)(_deadCodeTemplates.deadCodeTemplates);
          var nodes = template.compile();
          var containingFnName = me.getPlaceholder("dead_" + me.changeData.deadCode);

          // Insert dummy function
          (0, _astUtils.prepend)(blockPath, t.functionDeclaration(t.identifier(containingFnName), [], t.blockStatement(_toConsumableArray(nodes))));
          (0, _astUtils.prepend)(blockPath, new _template["default"]("\n              if({falsePredicate}) {\n                ".concat(containingFnName, "()\n              }\n              ")).single({
            falsePredicate: predicateGen.generateFalseExpression(blockPath)
          }));
          me.skip(blockPath);
        }
      }
    }
  };
};