"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DEFAULT_OPTIONS = void 0;
var _assert = require("assert");
var _generator = _interopRequireDefault(require("@babel/generator"));
var _traverse = _interopRequireDefault(require("@babel/traverse"));
var _parser = require("@babel/parser");
var _validateOptions = require("./validateOptions");
var _NameGen = require("./utils/NameGen");
var _order = require("./order");
var _plugin = require("./transforms/plugin");
var _objectUtils = require("./utils/object-utils");
var _preparation = _interopRequireDefault(require("./transforms/preparation"));
var _renameVariables = _interopRequireDefault(require("./transforms/identifier/renameVariables"));
var _variableMasking = _interopRequireDefault(require("./transforms/variableMasking"));
var _dispatcher = _interopRequireDefault(require("./transforms/dispatcher"));
var _duplicateLiteralsRemoval = _interopRequireDefault(require("./transforms/extraction/duplicateLiteralsRemoval"));
var _objectExtraction = _interopRequireDefault(require("./transforms/extraction/objectExtraction"));
var _globalConcealing = _interopRequireDefault(require("./transforms/identifier/globalConcealing"));
var _stringCompression = _interopRequireDefault(require("./transforms/string/stringCompression"));
var _deadCode = _interopRequireDefault(require("./transforms/deadCode"));
var _stringSplitting = _interopRequireDefault(require("./transforms/string/stringSplitting"));
var _shuffle = _interopRequireDefault(require("./transforms/shuffle"));
var _astScrambler = _interopRequireDefault(require("./transforms/astScrambler"));
var _calculator = _interopRequireDefault(require("./transforms/calculator"));
var _movedDeclarations = _interopRequireDefault(require("./transforms/identifier/movedDeclarations"));
var _renameLabels = _interopRequireDefault(require("./transforms/renameLabels"));
var _rgf = _interopRequireDefault(require("./transforms/rgf"));
var _flatten = _interopRequireDefault(require("./transforms/flatten"));
var _stringConcealing = _interopRequireDefault(require("./transforms/string/stringConcealing"));
var _lock = _interopRequireDefault(require("./transforms/lock/lock"));
var _controlFlowFlattening = _interopRequireDefault(require("./transforms/controlFlowFlattening"));
var _opaquePredicates = _interopRequireDefault(require("./transforms/opaquePredicates"));
var _minify = _interopRequireDefault(require("./transforms/minify"));
var _finalizer = _interopRequireDefault(require("./transforms/finalizer"));
var _integrity = _interopRequireDefault(require("./transforms/lock/integrity"));
var _pack = _interopRequireDefault(require("./transforms/pack"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Transforms
var DEFAULT_OPTIONS = exports.DEFAULT_OPTIONS = {
  target: "node",
  compact: true
};
var Obfuscator = exports["default"] = /*#__PURE__*/function () {
  function Obfuscator(userOptions, parentObfuscator) {
    var _this = this,
      _this$options$lock;
    _classCallCheck(this, Obfuscator);
    _defineProperty(this, "plugins", []);
    _defineProperty(this, "totalPossibleTransforms", 0);
    _defineProperty(this, "globalState", {
      lock: {
        integrity: {
          sensitivityRegex: / |\n|;|,|\{|\}|\(|\)|\.|\[|\]/g
        },
        createCountermeasuresCode: function createCountermeasuresCode() {
          throw new Error("Not implemented");
        }
      },
      // After RenameVariables completes, this map will contain the renamed variables
      // Most use cases involve grabbing the Program(global) mappings
      renamedVariables: new Map(),
      // Internal functions, should not be renamed/removed
      internals: {
        stringCompressionLibraryName: "",
        nativeFunctionName: "",
        integrityHashName: "",
        invokeCountermeasuresFnName: ""
      }
    });
    _defineProperty(this, "index", 0);
    _defineProperty(this, "probabilityMapCounter", new WeakMap());
    this.parentObfuscator = parentObfuscator;
    (0, _validateOptions.validateOptions)(userOptions);
    this.options = (0, _validateOptions.applyDefaultsToOptions)(_objectSpread({}, userOptions));
    this.nameGen = new _NameGen.NameGen(this.options.identifierGenerator);
    var shouldAddLockTransform = this.options.lock && (Object.keys(this.options.lock).filter(function (key) {
      return key !== "customLocks" && _this.isProbabilityMapProbable(_this.options.lock[key]);
    }).length > 0 || this.options.lock.customLocks.length > 0);
    var allPlugins = [];
    var push = function push(probabilityMap) {
      for (var _len = arguments.length, pluginFns = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        pluginFns[_key - 1] = arguments[_key];
      }
      _this.totalPossibleTransforms += pluginFns.length;
      if (!_this.isProbabilityMapProbable(probabilityMap)) return;
      allPlugins.push.apply(allPlugins, pluginFns);
    };
    push(true, _preparation["default"]);
    push(this.options.objectExtraction, _objectExtraction["default"]);
    push(this.options.flatten, _flatten["default"]);
    push(shouldAddLockTransform, _lock["default"]);
    push(this.options.rgf, _rgf["default"]);
    push(this.options.dispatcher, _dispatcher["default"]);
    push(this.options.deadCode, _deadCode["default"]);
    push(this.options.controlFlowFlattening, _controlFlowFlattening["default"]);
    push(this.options.calculator, _calculator["default"]);
    push(this.options.globalConcealing, _globalConcealing["default"]);
    push(this.options.opaquePredicates, _opaquePredicates["default"]);
    push(this.options.stringSplitting, _stringSplitting["default"]);
    push(this.options.stringConcealing, _stringConcealing["default"]);
    // String Compression is only applied to the main obfuscator
    // Any RGF functions will not have string compression due to the size of the decompression function

    push(!parentObfuscator && this.options.stringCompression, _stringCompression["default"]);
    push(this.options.variableMasking, _variableMasking["default"]);
    push(this.options.duplicateLiteralsRemoval, _duplicateLiteralsRemoval["default"]);
    push(this.options.shuffle, _shuffle["default"]);
    push(this.options.movedDeclarations, _movedDeclarations["default"]);
    push(this.options.renameLabels, _renameLabels["default"]);
    push(this.options.minify, _minify["default"]);
    push(this.options.astScrambler, _astScrambler["default"]);
    push(this.options.renameVariables, _renameVariables["default"]);
    push(true, _finalizer["default"]);
    push(this.options.pack, _pack["default"]);
    push((_this$options$lock = this.options.lock) === null || _this$options$lock === void 0 ? void 0 : _this$options$lock.integrity, _integrity["default"]);
    allPlugins.map(function (pluginFunction) {
      var pluginInstance;
      var plugin = pluginFunction({
        Plugin: function Plugin(order, mergeObject) {
          (0, _assert.ok)(typeof order === "number");
          var pluginOptions = {
            order: order,
            name: _order.Order[order]
          };
          var newPluginInstance = new _plugin.PluginInstance(pluginOptions, _this);
          if (_typeof(mergeObject) === "object" && mergeObject) {
            Object.assign(newPluginInstance, mergeObject);
          }
          pluginInstance = newPluginInstance;

          // @ts-ignore
          return newPluginInstance;
        }
      });
      (0, _assert.ok)(pluginInstance, "Plugin instance not created: " + pluginFunction.toString());
      _this.plugins.push({
        plugin: plugin,
        pluginInstance: pluginInstance
      });
    });
    this.plugins = this.plugins.sort(function (a, b) {
      return a.pluginInstance.order - b.pluginInstance.order;
    });
    if (!parentObfuscator && this.hasPlugin(_order.Order.StringCompression)) {
      this.globalState.internals.stringCompressionLibraryName = this.nameGen.generate(false);
    }
  }
  return _createClass(Obfuscator, [{
    key: "isInternalVariable",
    value:
    // Pack Interface for sharing globals across RGF functions

    function isInternalVariable(name) {
      return Object.values(this.globalState.internals).includes(name);
    }
  }, {
    key: "shouldTransformNativeFunction",
    value: function shouldTransformNativeFunction(nameAndPropertyPath) {
      var _this$options$lock2;
      if (!((_this$options$lock2 = this.options.lock) !== null && _this$options$lock2 !== void 0 && _this$options$lock2.tamperProtection)) {
        return false;
      }

      // Custom implementation for Tamper Protection
      if (typeof this.options.lock.tamperProtection === "function") {
        return this.options.lock.tamperProtection(nameAndPropertyPath.join("."));
      }
      if (this.options.target === "browser" && nameAndPropertyPath.length === 1 && nameAndPropertyPath[0] === "fetch") {
        return true;
      }
      var globalObject = {};
      try {
        globalObject = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : new Function("return this")();
      } catch (e) {}
      var fn = globalObject;
      var _iterator = _createForOfIteratorHelper(nameAndPropertyPath),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _fn;
          var item = _step.value;
          fn = (_fn = fn) === null || _fn === void 0 ? void 0 : _fn[item];
          if (typeof fn === "undefined") return false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var hasNativeCode = typeof fn === "function" && ("" + fn).includes("[native code]");
      return hasNativeCode;
    }
  }, {
    key: "getStringCompressionLibraryName",
    value: function getStringCompressionLibraryName() {
      if (this.parentObfuscator) {
        return this.parentObfuscator.getStringCompressionLibraryName();
      }
      return this.globalState.internals.stringCompressionLibraryName;
    }
  }, {
    key: "getObfuscatedVariableName",
    value: function getObfuscatedVariableName(originalName, programNode) {
      var renamedVariables = this.globalState.renamedVariables.get(programNode);
      return (renamedVariables === null || renamedVariables === void 0 ? void 0 : renamedVariables.get(originalName)) || originalName;
    }

    /**
     * The main Name Generator for `Rename Variables`
     */
  }, {
    key: "obfuscateAST",
    value: function obfuscateAST(ast, options) {
      var finalASTHandler = [];
      for (var i = 0; i < this.plugins.length; i++) {
        var _plugin$post;
        this.index = i;
        var _this$plugins$i = this.plugins[i],
          plugin = _this$plugins$i.plugin,
          pluginInstance = _this$plugins$i.pluginInstance;
        if (this.options.verbose) {
          console.log("Applying ".concat(pluginInstance.name, " (").concat(i + 1, "/").concat(this.plugins.length, ")"));
        }
        (0, _traverse["default"])(ast, plugin.visitor);
        (_plugin$post = plugin.post) === null || _plugin$post === void 0 || _plugin$post.call(plugin);
        if (plugin.finalASTHandler) {
          finalASTHandler.push(plugin.finalASTHandler);
        }
        if (options !== null && options !== void 0 && options.profiler) {
          var _this$plugins;
          options === null || options === void 0 || options.profiler({
            index: i,
            currentTransform: pluginInstance.name,
            nextTransform: (_this$plugins = this.plugins[i + 1]) === null || _this$plugins === void 0 || (_this$plugins = _this$plugins.pluginInstance) === null || _this$plugins === void 0 ? void 0 : _this$plugins.name,
            totalTransforms: this.plugins.length
          });
        }
      }
      for (var _i = 0, _finalASTHandler = finalASTHandler; _i < _finalASTHandler.length; _i++) {
        var handler = _finalASTHandler[_i];
        ast = handler(ast);
      }
      return ast;
    }
  }, {
    key: "obfuscate",
    value: function () {
      var _obfuscate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(sourceCode) {
        var ast, code;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // Parse the source code into an AST
              ast = Obfuscator.parseCode(sourceCode);
              ast = this.obfuscateAST(ast);

              // Generate the transformed code from the modified AST with comments removed and compacted output
              code = this.generateCode(ast);
              return _context.abrupt("return", {
                code: code
              });
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function obfuscate(_x) {
        return _obfuscate.apply(this, arguments);
      }
      return obfuscate;
    }()
  }, {
    key: "getPlugin",
    value: function getPlugin(order) {
      return this.plugins.find(function (x) {
        return x.pluginInstance.order === order;
      });
    }
  }, {
    key: "hasPlugin",
    value: function hasPlugin(order) {
      return !!this.getPlugin(order);
    }

    /**
     * Calls `Obfuscator.generateCode` with the current instance options
     */
  }, {
    key: "generateCode",
    value: function generateCode(ast) {
      return Obfuscator.generateCode(ast, this.options);
    }

    /**
     * Generates code from an AST using `@babel/generator`
     */
  }, {
    key: "computeProbabilityMap",
    value:
    /**
     * Evaluates a ProbabilityMap.
     * @param map The setting object.
     * @param customFnArgs Args given to user-implemented function, such as a variable name.
     */
    function computeProbabilityMap(map) {
      for (var _len2 = arguments.length, customImplementationArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        customImplementationArgs[_key2 - 1] = arguments[_key2];
      }
      // Check if this probability map uses the {value: ..., limit: ...} format
      if (_typeof(map) === "object" && map && "value" in map) {
        // Check for the limit property
        if ("limit" in map && typeof map.limit === "number" && map.limit >= 0) {
          // Check if the limit has been reached
          if (this.probabilityMapCounter.get(map) >= map.limit) {
            return false;
          }
        }
        var value = this.computeProbabilityMap.apply(this, [map.value].concat(customImplementationArgs));
        if (value) {
          // Increment the counter for this map
          this.probabilityMapCounter.set(map, this.probabilityMapCounter.get(map) + 1 || 1);
        }
        return value;
      }
      if (!map) {
        return false;
      }
      if (map === true || map === 1) {
        return true;
      }
      if (typeof map === "number") {
        return Math.random() < map;
      }
      if (typeof map === "function") {
        return map.apply(void 0, customImplementationArgs);
      }
      if (typeof map === "string") {
        return map;
      }
      var asObject = {};
      if (Array.isArray(map)) {
        map.forEach(function (x) {
          asObject[x.toString()] = 1;
        });
      } else {
        asObject = map;
      }
      var total = Object.values(asObject).reduce(function (a, b) {
        return a + b;
      });
      var percentages = (0, _objectUtils.createObject)(Object.keys(asObject), Object.values(asObject).map(function (x) {
        return x / total;
      }));
      var ticket = Math.random();
      var count = 0;
      var winner = null;
      Object.keys(percentages).forEach(function (key) {
        var x = Number(percentages[key]);
        if (ticket >= count && ticket < count + x) {
          winner = key;
        }
        count += x;
      });
      return winner;
    }

    /**
     * Determines if a probability map can return a positive result (true, or some string mode).
     * - Negative probability maps are used to remove transformations from running entirely.
     * @param map
     */
  }, {
    key: "isProbabilityMapProbable",
    value: function isProbabilityMapProbable(map) {
      (0, _assert.ok)(!Number.isNaN(map), "Numbers cannot be NaN");
      if (!map || typeof map === "undefined") {
        return false;
      }
      if (typeof map === "function") {
        return true;
      }
      if (typeof map === "number") {
        if (map > 1 || map < 0) {
          throw new Error("Numbers must be between 0 and 1 for 0% - 100%");
        }
      }
      if (Array.isArray(map)) {
        (0, _assert.ok)(map.length != 0, "Empty arrays are not allowed for options. Use false instead.");
        if (map.length == 1) {
          return !!map[0];
        }
      }
      if (_typeof(map) === "object") {
        if (map instanceof Date) return true;
        if (map instanceof RegExp) return true;
        if ("value" in map && !map.value) return false;
        if ("limit" in map && map.limit === 0) return false;
        var keys = Object.keys(map);
        (0, _assert.ok)(keys.length != 0, "Empty objects are not allowed for options. Use false instead.");
        if (keys.length == 1) {
          return !!map[keys[0]];
        }
      }
      return true;
    }
  }], [{
    key: "generateCode",
    value: function generateCode(ast) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPTIONS;
      var compact = !!options.compact;
      var _generate = (0, _generator["default"])(ast, {
          comments: false,
          // Remove comments
          minified: compact
          // jsescOption: {
          //   String Encoding using Babel
          //   escapeEverything: true,
          // },
        }),
        code = _generate.code;
      return code;
    }

    /**
     * Parses the source code into an AST using `babel.parseSync`
     */
  }, {
    key: "parseCode",
    value: function parseCode(sourceCode) {
      // Parse the source code into an AST
      var ast = (0, _parser.parse)(sourceCode, {
        sourceType: "unambiguous"
      });
      return ast;
    }
  }]);
}();