"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var t = _interopRequireWildcard(require("@babel/types"));
var _NameGen = require("./NameGen");
var _astUtils = require("./ast-utils");
var _randomUtils = require("./random-utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * A Control Object is an object that is used to store properties that are used in multiple places.
 */
var ControlObject = exports["default"] = /*#__PURE__*/function () {
  function ControlObject(me, blockPath) {
    _classCallCheck(this, ControlObject);
    _defineProperty(this, "propertyNames", new Set());
    _defineProperty(this, "objectName", null);
    _defineProperty(this, "objectPath", null);
    _defineProperty(this, "objectExpression", null);
    this.me = me;
    this.blockPath = blockPath;
    this.nameGen = new _NameGen.NameGen(me.options.identifierGenerator, {
      avoidReserved: true,
      avoidObjectPrototype: true
    });
  }
  return _createClass(ControlObject, [{
    key: "createMemberExpression",
    value: function createMemberExpression(propertyName) {
      return t.memberExpression(t.identifier(this.objectName), t.stringLiteral(propertyName), true);
    }
  }, {
    key: "createPredicate",
    value: function createPredicate() {
      this.ensureCreated();
      var propertyName = (0, _randomUtils.choice)(Array.from(this.propertyNames));
      if (!propertyName || (0, _randomUtils.chance)(50)) {
        propertyName = this.nameGen.generate();
      }
      return {
        node: t.binaryExpression("in", t.stringLiteral(propertyName), t.identifier(this.objectName)),
        value: this.propertyNames.has(propertyName)
      };
    }
  }, {
    key: "createTruePredicate",
    value: function createTruePredicate() {
      var _this$createPredicate = this.createPredicate(),
        node = _this$createPredicate.node,
        value = _this$createPredicate.value;
      if (value) {
        return node;
      }
      return t.unaryExpression("!", node);
    }
  }, {
    key: "createFalsePredicate",
    value: function createFalsePredicate() {
      var _this$createPredicate2 = this.createPredicate(),
        node = _this$createPredicate2.node,
        value = _this$createPredicate2.value;
      if (!value) {
        return node;
      }
      return t.unaryExpression("!", node);
    }
  }, {
    key: "ensureCreated",
    value: function ensureCreated(node) {
      if (!this.objectName) {
        // Object hasn't been created yet
        this.objectName = this.me.getPlaceholder() + "_controlObject";
        if (node && t.isFunctionExpression(node) && !node.id) {
          // Use function declaration as object

          var newNode = node;
          newNode.type = "FunctionDeclaration";
          newNode.id = t.identifier(this.objectName);
          var newPath = (0, _astUtils.prepend)(this.blockPath, newNode)[0];
          this.me.skip(newPath);
          this.objectPath = newPath;
          return t.identifier(this.objectName);
        } else {
          // Create plain object
          var _newPath = (0, _astUtils.prepend)(this.blockPath, t.variableDeclaration("var", [t.variableDeclarator(t.identifier(this.objectName), t.objectExpression([]))]))[0];
          this.me.skip(_newPath);
          this.objectPath = _newPath;
          var objectExpression = _newPath.node.declarations[0].init;
          this.objectExpression = objectExpression;
          this.me.skip(this.objectExpression);
        }
      }
    }
  }, {
    key: "addProperty",
    value: function addProperty(node) {
      var initialNode = this.ensureCreated(node);
      if (initialNode) return initialNode;
      var propertyName = this.nameGen.generate();
      this.propertyNames.add(propertyName);

      // Add an initial property
      if (this.objectExpression) {
        this.objectExpression.properties.push(t.objectProperty(t.identifier(propertyName), node));
      } else {
        // Add as assignment expression

        var assignment = t.assignmentExpression("=", this.createMemberExpression(propertyName), node);
        var newPath = this.objectPath.insertAfter(t.expressionStatement(assignment))[0];
        this.me.skip(newPath);
      }
      return this.createMemberExpression(propertyName);
    }
  }]);
}();