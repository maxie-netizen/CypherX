"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var t = _interopRequireWildcard(require("@babel/types"));
var _astUtils = require("./ast-utils");
var _NameGen = require("./NameGen");
var _template = _interopRequireDefault(require("../templates/template"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PredicateGen = exports["default"] = /*#__PURE__*/function () {
  function PredicateGen(plugin) {
    _classCallCheck(this, PredicateGen);
    _defineProperty(this, "dummyFunctionName", null);
    _defineProperty(this, "programPath", null);
    this.plugin = plugin;
  }
  return _createClass(PredicateGen, [{
    key: "ensureCreated",
    value: function ensureCreated() {
      if (this.dummyFunctionName) return;
      this.dummyFunctionName = this.plugin.getPlaceholder("dummyFunction");

      // Insert dummy function
      (0, _astUtils.prepend)(this.programPath, this.plugin.skip(t.functionDeclaration(t.identifier(this.dummyFunctionName), [], t.blockStatement([]))));
    }
  }, {
    key: "generateTrueExpression",
    value: function generateTrueExpression(path) {
      return t.unaryExpression("!", this.generateFalseExpression(path));
    }
  }, {
    key: "generateFalseExpression",
    value: function generateFalseExpression(path) {
      this.programPath = path.find(function (p) {
        return p.isProgram();
      });
      this.ensureCreated();

      // Overcomplicated way to get a random property name that doesn't exist on the Function
      var randomProperty;
      var nameGen = new _NameGen.NameGen("randomized");
      function PrototypeCollision() {}
      PrototypeCollision(); // Call it for code coverage :D

      do {
        randomProperty = nameGen.generate();
      } while (!randomProperty || PrototypeCollision[randomProperty] !== undefined);
      return this.plugin.skip(new _template["default"]("\"".concat(randomProperty, "\" in ").concat(this.dummyFunctionName)).expression());
    }
  }]);
}();