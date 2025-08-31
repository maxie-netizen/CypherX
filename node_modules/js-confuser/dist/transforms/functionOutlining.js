"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _order = require("../order");
var _astUtils = require("../utils/ast-utils");
var t = _interopRequireWildcard(require("@babel/types"));
var _randomUtils = require("../utils/random-utils");
var _probability = require("../probability");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function isSafeForOutlining(path) {
  if (path.isIdentifier() || path.isLiteral()) return {
    isSafe: false
  };

  // Skip direct invocations ('this' will be different)
  if (path.key === "callee" && path.parentPath.isCallExpression()) {
    return {
      isSafe: false
    };
  }

  // Skip typeof and delete expressions (identifier behavior is different)
  if (path.key === "argument" && path.parentPath.isUnaryExpression()) {
    return {
      isSafe: false
    };
  }
  if (path.isReturnStatement() || path.isYieldExpression() || path.isAwaitExpression() || path.isContinueStatement() || path.isBreakStatement() || path.isThrowStatement() || path.isDebuggerStatement() || path.isImportDeclaration() || path.isExportDeclaration()) {
    return {
      isSafe: false
    };
  }
  var isSafe = true;
  var bindings = [];
  var fnPath = path.getFunctionParent();
  var visitor = {
    ThisExpression: function ThisExpression(path) {
      isSafe = false;
      path.stop();
    },
    Identifier: function Identifier(path) {
      if (["arguments", "eval"].includes(path.node.name)) {
        isSafe = false;
        path.stop();
      }
    },
    BindingIdentifier: function BindingIdentifier(path) {
      var binding = path.scope.getBinding(path.node.name);
      if (binding) {
        bindings.push(binding);
      }
    },
    // Function flow guard
    "ReturnStatement|YieldExpression|AwaitExpression": function ReturnStatementYieldExpressionAwaitExpression(path) {
      if (path.getFunctionParent() === fnPath) {
        isSafe = false;
        path.stop();
      }
    }
  };

  // Exclude 'ThisExpression' and semantic 'Identifier' nodes
  if (visitor[path.type]) return {
    isSafe: false
  };
  path.traverse(visitor);
  return {
    isSafe: isSafe,
    bindings: bindings
  };
}
var _default = exports["default"] = function _default(_ref) {
  var Plugin = _ref.Plugin;
  var me = Plugin(_order.Order.FunctionOutlining, {
    changeData: {
      functionsMade: 0
    }
  });
  var changesMade = 0;
  function checkProbability() {
    if (!(0, _probability.computeProbabilityMap)(me.options.functionOutlining)) return false;
    if (changesMade > 100 && (0, _randomUtils.chance)(changesMade - 100)) return false;
    return true;
  }
  return {
    visitor: {
      Block: {
        exit: function exit(blockPath) {
          if (blockPath.isProgram()) {
            blockPath.scope.crawl();
          }
          if (blockPath.find(function (p) {
            return me.isSkipped(p);
          })) return;
          if (!checkProbability()) return;

          // Extract a random number of statements

          var statements = blockPath.get("body");
          // var startIndex = getRandomInteger(0, statements.length);
          // var endIndex = getRandomInteger(startIndex, statements.length);

          var startIndex = 0;
          var endIndex = statements.length;
          var extractedStatements = statements.slice(startIndex, endIndex);
          if (!extractedStatements.length) return;
          var bindings = [];
          var _iterator = _createForOfIteratorHelper(extractedStatements),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var statement = _step.value;
              // Don't override the control node
              if (me.isSkipped(statement)) return;
              var result = isSafeForOutlining(statement);
              if (!result.isSafe) {
                return;
              }
              bindings.push.apply(bindings, _toConsumableArray(result.bindings));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var extractedStatementSet = new Set(extractedStatements);
          for (var _i = 0, _bindings = bindings; _i < _bindings.length; _i++) {
            var binding = _bindings[_i];
            var _iterator2 = _createForOfIteratorHelper(binding.referencePaths),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var referencePath = _step2.value;
                var found = referencePath.find(function (p) {
                  return extractedStatementSet.has(p);
                });
                if (!found) {
                  return;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            var _iterator3 = _createForOfIteratorHelper(binding.constantViolations),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var constantViolation = _step3.value;
                var found = constantViolation.find(function (p) {
                  return extractedStatementSet.has(p);
                });
                if (!found) {
                  return;
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
          changesMade++;
          var isFirst = true;
          var _iterator4 = _createForOfIteratorHelper(extractedStatements),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var statement = _step4.value;
              if (isFirst) {
                isFirst = false;
                var memberExpression = me.getControlObject(blockPath).addProperty(t.functionExpression(null, [], t.blockStatement(extractedStatements.map(function (x) {
                  return x.node;
                }))));
                me.changeData.functionsMade++;
                var callExpression = t.callExpression(memberExpression, []);
                statement.replaceWith(callExpression);
                continue;
              }
              statement.remove();
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      },
      Expression: {
        exit: function exit(path) {
          // Skip assignment left
          if (path.find(function (p) {
            var _p$parentPath;
            return p.key === "left" && ((_p$parentPath = p.parentPath) === null || _p$parentPath === void 0 ? void 0 : _p$parentPath.type) === "AssignmentExpression";
          })) {
            return;
          }
          if (!checkProbability()) return;
          if (path.find(function (p) {
            return me.isSkipped(p);
          })) return;
          if (!isSafeForOutlining(path).isSafe) return;
          changesMade++;
          var blockPath = path.find(function (p) {
            return p.isBlock();
          });
          var memberExpression = me.getControlObject(blockPath).addProperty(t.functionExpression(null, [], t.blockStatement([t.returnStatement(t.cloneNode(path.node))])));
          me.changeData.functionsMade++;
          var callExpression = t.callExpression(memberExpression, []);
          (0, _astUtils.ensureComputedExpression)(path);
          path.replaceWith(callExpression);
          me.skip(path);
        }
      }
    }
  };
};