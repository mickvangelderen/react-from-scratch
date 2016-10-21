/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = render;
	
	var _data = __webpack_require__(2);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _domToVirtualDom = __webpack_require__(6);
	
	var _domToVirtualDom2 = _interopRequireDefault(_domToVirtualDom);
	
	var _reconcile = __webpack_require__(28);
	
	var _reconcile2 = _interopRequireDefault(_reconcile);
	
	var _renderMain = __webpack_require__(29);
	
	var _renderMain2 = _interopRequireDefault(_renderMain);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-env browser */
	let actual = null;
	if (typeof document !== "undefined") {
	  actual = (0, _domToVirtualDom2.default)(document.getElementById('root'));
	  render();
	}
	
	function render() {
	  const desired = (0, _renderMain2.default)(_data2.default);
	  (0, _reconcile2.default)(actual.element.parentNode, actual, desired);
	  actual = desired;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _queryString = __webpack_require__(3);
	
	var _queryString2 = _interopRequireDefault(_queryString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const qs = typeof location === 'undefined' ? {} : _queryString2.default.parse(location.search); // eslint-disable-line no-undef
	
	console.log(qs);
	
	exports.default = {
	  sessions: [{
	    id: 'snaukx',
	    startDate: '2016-01-01T00:00:00Z',
	    userId: 'j3010t'
	  }, {
	    id: '6enql1',
	    startDate: '2016-05-01T00:00:00Z',
	    userId: 'h4am71'
	  }],
	  users: [{
	    id: 'j3010t',
	    name: 'Mick van Gelderen'
	  }, {
	    id: 'h4am71',
	    name: 'Andy van Gelderen'
	  }],
	  items: [{
	    id: 'fcqsxl',
	    userId: 'j3010t',
	    title: 'Groceries',
	    description: 'Have to do the groceries.'
	  }, {
	    id: 'p2f8pp',
	    userId: 'j3010t',
	    title: 'Read Pattern Recognition book',
	    description: 'Its in my bookcase you know...'
	  }, {
	    id: '9lsnmp',
	    userId: 'h4am71',
	    title: 'Buy bread',
	    description: 'Have to do the groceries.'
	  }, {
	    id: 'byogzg',
	    userId: 'h4am71',
	    title: 'Play Dragon Age',
	    description: 'Time for the inquisition!'
	  }],
	  activeSessionId: qs.activeSessionId
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(4);
	var objectAssign = __webpack_require__(5);
	
	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}
	
		return value;
	}
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);
	
		if (typeof str !== 'string') {
			return ret;
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return ret;
		}
	
		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			key = decodeURIComponent(key);
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});
	
		return ret;
	};
	
	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};
	
		opts = objectAssign(defaults, opts);
	
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return encode(key, opts);
			}
	
			if (Array.isArray(val)) {
				var result = [];
	
				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}
	
					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});
	
				return result.join('&');
			}
	
			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = domToVirtualDom;
	
	var _Comment = __webpack_require__(7);
	
	var _Comment2 = _interopRequireDefault(_Comment);
	
	var _Text = __webpack_require__(25);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	var _Element = __webpack_require__(26);
	
	var _Element2 = _interopRequireDefault(_Element);
	
	var _NO_EVENTS = __webpack_require__(27);
	
	var _NO_EVENTS2 = _interopRequireDefault(_NO_EVENTS);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-env browser */
	
	function extractAttributes(node) {
	  const attributes = {};
	  for (let i = 0, a = node.attributes, l = a.length; i < l; i++) {
	    var _a$i = a[i];
	    const name = _a$i.name;
	    const value = _a$i.value;
	
	    attributes[name] = value;
	  }
	  return attributes;
	}
	
	function domToVirtualDom(node) {
	  let vnode;
	  switch (node.nodeType) {
	    case Node.COMMENT_NODE:
	      vnode = new _Comment2.default(node.nodeValue);
	      break;
	    case Node.TEXT_NODE:
	      vnode = new _Text2.default(node.nodeValue);
	      break;
	    case Node.ELEMENT_NODE:
	      vnode = new _Element2.default(node.tagName.toLowerCase(), extractAttributes(node), _NO_EVENTS2.default, Array.prototype.map.call(node.childNodes, domToVirtualDom));
	      break;
	    default:
	      throw new Error(`Cannot create virtual dom for node of type ${ node.nodeType }.`);
	
	  }
	  vnode.element = node;
	  return vnode;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Comment;
	
	var _Node = __webpack_require__(8);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Comment(text) {
	  _Node2.default.call(this);
	  this.text = text;
	}
	
	Comment.prototype = Object.create(_Node2.default.prototype, {
	  constructor: {
	    value: Comment,
	    writable: true,
	    enumerable: false,
	    configurable: true
	  }
	});
	
	Comment.prototype.mount = function (parent, before) {
	  const element = document.createComment(this.text);
	
	  element['@@virtual'] = this;
	
	  if (before) {
	    parent.insertBefore(element, before);
	  } else {
	    parent.appendChild(element);
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Node;
	
	var _util = __webpack_require__(9);
	
	function Node() {
	  if (this.constructor === Node) throw new Error('Cannot instantiate abstract class Node.');
	  this.element = null;
	}
	
	Node.prototype.children = [];
	
	Node.prototype.mount = function (parent, before) {
	  throw new Error('mount was not implemented.');
	};
	
	Node.prototype.unmount = function (parent) {
	  parent.removeChild(this.element);
	  this.element = null;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.stringify = stringify;
	exports.isNode = isNode;
	exports.expectNode = expectNode;
	exports.expectAttributes = expectAttributes;
	exports.expectAttributeValue = expectAttributeValue;
	exports.expectEvents = expectEvents;
	exports.expectChildren = expectChildren;
	
	var _Node = __webpack_require__(8);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	var _isArray = __webpack_require__(10);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isObject = __webpack_require__(11);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _expectObject = __webpack_require__(12);
	
	var _expectObject2 = _interopRequireDefault(_expectObject);
	
	var _isString = __webpack_require__(18);
	
	var _isString2 = _interopRequireDefault(_isString);
	
	var _expectString = __webpack_require__(19);
	
	var _expectString2 = _interopRequireDefault(_expectString);
	
	var _expectArray = __webpack_require__(20);
	
	var _expectArray2 = _interopRequireDefault(_expectArray);
	
	var _isFunction = __webpack_require__(21);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _expectFunction = __webpack_require__(22);
	
	var _expectFunction2 = _interopRequireDefault(_expectFunction);
	
	var _isBoolean = __webpack_require__(23);
	
	var _isBoolean2 = _interopRequireDefault(_isBoolean);
	
	var _isUndefined = __webpack_require__(24);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function stringify(value) {
	  return JSON.stringify(value);
	}
	
	function isNode(value) {
	  return value instanceof _Node2.default;
	}
	
	function expectNode(value) {
	  if (!isNode(value)) throw new TypeError(`Expected a Node but got ${ stringify(value) }.`);
	  return value;
	}
	
	function expectAttributes(value) {
	  (0, _expectObject2.default)(value);
	  Object.keys(value).forEach(key => {
	    (0, _expectString2.default)(key);
	    expectAttributeValue(value[key]);
	  });
	  return value;
	}
	
	function expectAttributeValue(value) {
	  if (!((0, _isString2.default)(value) || (0, _isBoolean2.default)(value) || (0, _isUndefined2.default)(value))) throw new TypeError(`Expected attribute value to be a string, boolean or undefined but got ${ stringify(value) }.`);
	  return value;
	}
	
	function expectEvents(value) {
	  (0, _expectObject2.default)(value);
	  Object.keys(value).forEach(key => {
	    (0, _expectString2.default)(key);
	    (0, _expectFunction2.default)(value[key]);
	  });
	  return value;
	}
	
	function expectChildren(value) {
	  (0, _expectArray2.default)(value);
	  value.forEach(child => {
	    expectNode(child);
	  });
	  return value;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*************************************************************************
	 * This file has been automatically generated, do not edit this directly *
	 *************************************************************************/
	
	const objectToString = Object.prototype.toString;
	
	exports.default = Array.isArray ? Array.isArray :
	/**
	 * Returns true if value is a Array, false otherwise.
	 * @param value The value.
	 * @return  Returns the result of the comparison.
	 */
	function isArray(value) {
	  return objectToString.call(value) === '[object Array]';
	};
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isObject;
	/*************************************************************************
	 * This file has been automatically generated, do not edit this directly *
	 *************************************************************************/
	
	/**
	 * Returns true if value is an object, false otherwise.
	 * @param value The value.
	 * @return  Returns the result of the comparison.
	 */
	function isObject(value) {
	  return typeof value === 'object' && value !== null;
	}
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = expectObject;
	
	var _inspect = __webpack_require__(13);
	
	var _inspect2 = _interopRequireDefault(_inspect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Throws an exception when value is not an object.
	 * @param value The value.
	 * @return Returns the passed value.
	 */
	function expectObject(value) {
	  if (typeof value === 'object' && value !== null) return value;
	  throw new Error(`Expected ${ (0, _inspect2.default)(value) } to be an object.`);
	} /*************************************************************************
	   * This file has been automatically generated, do not edit this directly *
	   *************************************************************************/
	//# sourceMappingURL=expectObject.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(14);
	
	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _util.inspect;
	  }
	});
	//# sourceMappingURL=inspect.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(16);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(17);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(15)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isString;
	/*************************************************************************
	 * This file has been automatically generated, do not edit this directly *
	 *************************************************************************/
	
	/**
	 * Returns true if value is a string, false otherwise.
	 * @param value The value.
	 * @return  Returns the result of the comparison.
	 */
	function isString(value) {
	  return typeof value === 'string';
	}
	//# sourceMappingURL=isString.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = expectString;
	
	var _inspect = __webpack_require__(13);
	
	var _inspect2 = _interopRequireDefault(_inspect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Throws an exception when value is not a string.
	 * @param value The value.
	 * @return Returns the passed value.
	 */
	function expectString(value) {
	  if (typeof value === 'string') return value;
	  throw new Error(`Expected ${ (0, _inspect2.default)(value) } to be a string.`);
	} /*************************************************************************
	   * This file has been automatically generated, do not edit this directly *
	   *************************************************************************/
	//# sourceMappingURL=expectString.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = expectArray;
	
	var _inspect = __webpack_require__(13);
	
	var _inspect2 = _interopRequireDefault(_inspect);
	
	var _isArray = __webpack_require__(10);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Throws an exception when value is not a Array.
	 * @param value The value.
	 * @return Returns the passed value.
	 */
	/*************************************************************************
	 * This file has been automatically generated, do not edit this directly *
	 *************************************************************************/
	
	function expectArray(value) {
	  if ((0, _isArray2.default)(value)) return value;
	  throw new Error(`Expected ${ (0, _inspect2.default)(value) } to be a Array.`);
	}
	//# sourceMappingURL=expectArray.js.map

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isFunction;
	/*************************************************************************
	 * This file has been automatically generated, do not edit this directly *
	 *************************************************************************/
	
	/**
	 * Returns true if value is a function, false otherwise.
	 * @param value The value.
	 * @return  Returns the result of the comparison.
	 */
	function isFunction(value) {
	  return typeof value === 'function';
	}
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = expectFunction;
	
	var _inspect = __webpack_require__(13);
	
	var _inspect2 = _interopRequireDefault(_inspect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Throws an exception when value is not a function.
	 * @param value The value.
	 * @return Returns the passed value.
	 */
	function expectFunction(value) {
	  if (typeof value === 'function') return value;
	  throw new Error(`Expected ${ (0, _inspect2.default)(value) } to be a function.`);
	} /*************************************************************************
	   * This file has been automatically generated, do not edit this directly *
	   *************************************************************************/
	//# sourceMappingURL=expectFunction.js.map

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isBoolean;
	/*************************************************************************
	 * This file has been automatically generated, do not edit this directly *
	 *************************************************************************/
	
	/**
	 * Returns true if value is true or false, false otherwise.
	 * @param value The value.
	 * @return  Returns the result of the comparison.
	 */
	function isBoolean(value) {
	  return typeof value === 'boolean';
	}
	//# sourceMappingURL=isBoolean.js.map

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isUndefined;
	/*************************************************************************
	 * This file has been automatically generated, do not edit this directly *
	 *************************************************************************/
	
	/**
	 * Returns true if value is undefined, false otherwise.
	 * @param value The value.
	 * @return  Returns the result of the comparison.
	 */
	function isUndefined(value) {
	  return value === void 0;
	}
	//# sourceMappingURL=isUndefined.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Text;
	
	var _Node = __webpack_require__(8);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Text(text) {
	  _Node2.default.call(this);
	  this.text = text;
	}
	
	Text.prototype = Object.create(_Node2.default.prototype, {
	  constructor: {
	    value: Text,
	    writable: true,
	    enumerable: false,
	    configurable: true
	  }
	});
	
	Text.prototype.mount = function (parent, before) {
	  const element = this.element = document.createTextNode(this.text);
	
	  element['@@virtual'] = this;
	
	  if (before) {
	    parent.insertBefore(element, before);
	  } else {
	    parent.appendChild(element);
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Element;
	
	var _Node = __webpack_require__(8);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	var _util = __webpack_require__(9);
	
	var _expectString = __webpack_require__(19);
	
	var _expectString2 = _interopRequireDefault(_expectString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Element(tag, attributes, events, children) {
	  _Node2.default.call(this, children);
	  this.tag = (0, _expectString2.default)(tag);
	  this.attributes = Object.keys((0, _util.expectAttributes)(attributes)).reduce((map, key) => {
	    const value = attributes[key];
	    if (typeof value === 'string') map[key] = value;else if (value === true) map[key] = '';
	    return map;
	  }, {});
	  this.events = (0, _util.expectEvents)(events);
	  this.children = (0, _util.expectChildren)(children);
	}
	
	Element.prototype = Object.create(_Node2.default.prototype, {
	  constructor: {
	    value: Element,
	    writable: true,
	    enumerable: false,
	    configurable: true
	  }
	});
	
	Element.prototype.mount = function (parent, before) {
	  const tag = this.tag;
	  const attributes = this.attributes;
	  const events = this.events;
	  const children = this.children;
	
	
	  const element = this.element = document.createElement(tag);
	
	  Object.keys(attributes).forEach(key => {
	    element.setAttribute(key, attributes[key]);
	  });
	
	  Object.keys(events).forEach(key => {
	    element.addEventListener(key, events[key]);
	  });
	
	  children.forEach(child => {
	    child.mount(element);
	  });
	
	  if (before) {
	    parent.insertBefore(element, before);
	  } else {
	    parent.appendChild(element);
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reconcile;
	
	var _Comment = __webpack_require__(7);
	
	var _Comment2 = _interopRequireDefault(_Comment);
	
	var _Element = __webpack_require__(26);
	
	var _Element2 = _interopRequireDefault(_Element);
	
	var _Text = __webpack_require__(25);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function noop() {}
	
	function patchObjectShallow(actual, desired, _ref) {
	  var _ref$add = _ref.add;
	  let add = _ref$add === undefined ? noop : _ref$add;
	  var _ref$update = _ref.update;
	  let update = _ref$update === undefined ? noop : _ref$update;
	  var _ref$remove = _ref.remove;
	  let remove = _ref$remove === undefined ? noop : _ref$remove;
	
	  Object.keys(actual).forEach(key => {
	    if (desired.hasOwnProperty(key)) {
	      if (actual[key] === desired[key]) {
	        // Property hasn't changed.
	      } else {
	        update(key, actual[key], desired[key]);
	      }
	    } else {
	      remove(key, actual[key]);
	    }
	  });
	  Object.keys(desired).forEach(key => {
	    if (!actual.hasOwnProperty(key)) {
	      // This has already been handled.
	    } else {
	      add(key, desired[key]);
	    }
	  });
	}
	
	function reconcile(parent, actual, desired) {
	  if (actual) {
	    if (!actual.element) throw new Error('Expected actual to have an associated element.');
	    if (desired) {
	      // Proceed as normal.
	    } else {
	      // Remove actual.
	      actual.unmount(parent);
	      return;
	    }
	  } else {
	    if (desired) {
	      // Add desired.
	      desired.mount(parent);
	      return;
	    } else {
	      throw new Error('Cannot reconcile two non-existing nodes.');
	    }
	  }
	
	  const element = actual.element;
	
	  if (actual.constructor !== desired.constructor) {
	    // Replace actual by desired.
	    desired.mount(parent, element);
	    actual.unmount(parent);
	    return;
	  }
	
	  switch (actual.constructor) {
	    case _Element2.default:
	      if (actual.tag !== desired.tag) {
	        // Replace actual by desired.
	        desired.mount(parent, element);
	        actual.unmount(parent);
	        return;
	      } else {
	        // Update the attributes.
	        patchObjectShallow(actual.attributes, desired.attributes, {
	          add: function add(key, desired) {
	            element.setAttribute(key, desired);
	          },
	          update: function update(key, actual, desired) {
	            element.setAttribute(key, desired);
	          },
	          remove: function remove(key) {
	            element.removeAttribute(key);
	          }
	        });
	
	        // Update the events.
	        patchObjectShallow(actual.events, desired.events, {
	          add: function add(key, desired) {
	            element.addEventListener(key, desired, false);
	          },
	          update: function update(key, actual, desired) {
	            element.removeEventListener(key, actual, false);
	            element.addEventListener(key, desired, false);
	          },
	          remove: function remove(key, actual) {
	            element.removeEventListener(key, actual, false);
	          }
	        });
	
	        for (let i = 0, l = Math.max(actual.children.length, desired.children.length); i < l; i++) {
	          reconcile(element, actual.children[i], desired.children[i]);
	        }
	
	        desired.element = element;
	      }
	      break;
	    case _Text2.default:
	    case _Comment2.default:
	      if (actual.text !== desired.text) {
	        element.nodeValue = desired.text;
	      }
	      desired.element = element;
	      break;
	  }
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderMain;
	
	var _data = __webpack_require__(2);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _Element = __webpack_require__(26);
	
	var _Element2 = _interopRequireDefault(_Element);
	
	var _NO_ATTRIBUTES = __webpack_require__(30);
	
	var _NO_ATTRIBUTES2 = _interopRequireDefault(_NO_ATTRIBUTES);
	
	var _NO_CHILDREN = __webpack_require__(31);
	
	var _NO_CHILDREN2 = _interopRequireDefault(_NO_CHILDREN);
	
	var _NO_EVENTS = __webpack_require__(27);
	
	var _NO_EVENTS2 = _interopRequireDefault(_NO_EVENTS);
	
	var _render = __webpack_require__(1);
	
	var _render2 = _interopRequireDefault(_render);
	
	var _Text = __webpack_require__(25);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	var _virtualDomToHtml = __webpack_require__(32);
	
	var _virtualDomToHtml2 = _interopRequireDefault(_virtualDomToHtml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } } /* eslint-env shared-node-browser */
	
	
	const ID_LENGTH = 6;
	const ID_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const ID_CHARACTERS_LENGTH = ID_CHARACTERS.length;
	
	function generateId() {
	  let id = '';
	  for (let i = 0; i < ID_LENGTH; i++) {
	    id = id + ID_CHARACTERS[Math.floor(Math.random() * ID_CHARACTERS_LENGTH)];
	  }
	  return id;
	}
	
	function signInFormSubmit(event) {
	  event.preventDefault();
	
	  setTimeout(function () {
	    const user = {
	      id: generateId(),
	      name: _data2.default.username
	    };
	
	    const session = {
	      id: generateId(),
	      userId: user.id,
	      startDate: new Date().toISOString()
	    };
	
	    _data2.default.users.push(user);
	    _data2.default.sessions.push(session);
	    _data2.default.username = '';
	    _data2.default.password = '';
	    _data2.default.activeSessionId = session.id;
	    window.history.pushState(null, null, `${ location.pathname }?activeSessionId=${ _data2.default.activeSessionId }`);
	    _data2.default.signInFormDisabled = false;
	
	    (0, _render2.default)();
	  }, 1000);
	
	  _data2.default.signInFormDisabled = true;
	
	  (0, _render2.default)();
	}
	
	function signInFormUsernameInput(event) {
	  _data2.default.username = event.target.value;
	
	  if (_data2.default.username === '') {
	    _data2.default.signInFormValidUsername = false;
	  } else {
	    _data2.default.signInFormValidUsername = true;
	  }
	
	  (0, _render2.default)();
	}
	
	function signInFormPasswordChange(event) {
	  _data2.default.password = event.target.value;
	
	  (0, _render2.default)();
	}
	
	function renderSignInForm(data) {
	  return new _Element2.default('form', _NO_ATTRIBUTES2.default, { submit: signInFormSubmit }, [new _Element2.default('div', { class: ['form-group'].concat(_toConsumableArray(data.signInFormValidUsername ? ['has-success'] : ['has-error'])).join(' ') }, _NO_EVENTS2.default, [new _Element2.default('label', { for: 'username' }, _NO_EVENTS2.default, [new _Text2.default('Username')]), new _Element2.default('input', { type: 'text', class: 'form-control', id: 'username', placeholder: 'Username', value: data.username }, { input: signInFormUsernameInput }, _NO_CHILDREN2.default)].concat(_toConsumableArray(data.signInFormValidUsername ? [] : [new _Element2.default('span', { class: 'help-block' }, _NO_EVENTS2.default, [new _Text2.default('Please provide a username.')])]))), new _Element2.default('div', { class: 'form-group' }, _NO_EVENTS2.default, [new _Element2.default('label', { for: 'password' }, _NO_EVENTS2.default, [new _Text2.default('Password')]), new _Element2.default('input', { type: 'password', class: 'form-control', id: 'password', placeholder: 'Password', value: data.password }, { change: signInFormPasswordChange }, _NO_CHILDREN2.default)]), new _Element2.default('button', { class: 'btn btn-primary', type: 'submit', disabled: data.signInFormDisabled }, _NO_EVENTS2.default, [new _Text2.default('Sign In')])]);
	}
	
	function activeSessionFormActiveSessionChange(event) {
	  _data2.default.activeSessionId = event.target.value;
	  window.history.pushState(null, null, `${ location.pathname }?activeSessionId=${ _data2.default.activeSessionId }`);
	
	  (0, _render2.default)();
	}
	
	function renderActiveSessionForm(data) {
	  return new _Element2.default('form', _NO_ATTRIBUTES2.default, _NO_EVENTS2.default, [new _Element2.default('div', { class: 'form-group' }, _NO_EVENTS2.default, [new _Element2.default('label', { for: 'active-session' }, _NO_EVENTS2.default, [new _Text2.default('Active Session')]), new _Element2.default('select', { class: 'form-control', id: 'active-session' }, { change: activeSessionFormActiveSessionChange }, data.sessions.map(session => {
	    const user = data.users.filter(user => user.id === session.userId)[0];
	    return new _Element2.default('option', { value: session.id, selected: session.id === data.activeSessionId }, _NO_EVENTS2.default, [new _Text2.default(user.name)]);
	  }))])]);
	}
	
	function renderActiveUser(data) {
	  const activeSession = data.sessions.filter(_ref => {
	    let id = _ref.id;
	    return id === data.activeSessionId;
	  })[0];
	  const activeUser = activeSession ? data.users.filter(_ref2 => {
	    let id = _ref2.id;
	    return id === activeSession.userId;
	  })[0] : undefined;
	  const activeItems = activeUser ? data.items.filter(_ref3 => {
	    let userId = _ref3.userId;
	    return userId === activeUser.id;
	  }) : [];
	
	  return new _Element2.default('div', _NO_ATTRIBUTES2.default, _NO_EVENTS2.default, activeUser ? [new _Element2.default('p', _NO_ATTRIBUTES2.default, _NO_EVENTS2.default, [new _Text2.default('Welcome ' + activeUser.name + '.')]), renderItems(activeItems)] : [new _Element2.default('p', _NO_ATTRIBUTES2.default, _NO_EVENTS2.default, [new _Text2.default('Please sign in.')])]);
	}
	
	function renderItems(items) {
	  return new _Element2.default('ol', _NO_ATTRIBUTES2.default, _NO_EVENTS2.default, items.map(item => new _Element2.default('li', { 'data-key': item.id }, _NO_EVENTS2.default, [new _Text2.default(item.title)])));
	}
	
	function renderMain(data) {
	  const desired = new _Element2.default('div', { id: 'root', class: 'container' }, _NO_EVENTS2.default, [renderSignInForm(data), renderActiveSessionForm(data), renderActiveUser(data), new _Element2.default('span', _NO_ATTRIBUTES2.default, _NO_EVENTS2.default, [new _Text2.default(new Date().toString())])]);
	
	  desired.children.push(new _Element2.default('pre', _NO_ATTRIBUTES2.default, _NO_EVENTS2.default, [new _Text2.default((0, _virtualDomToHtml2.default)(desired))]));
	
	  return desired;
	}

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = [];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = virtualDomToHtml;
	
	var _Comment = __webpack_require__(7);
	
	var _Comment2 = _interopRequireDefault(_Comment);
	
	var _Text = __webpack_require__(25);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	var _Element = __webpack_require__(26);
	
	var _Element2 = _interopRequireDefault(_Element);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function attributesToHtml(attributes) {
	  const keys = Object.keys(attributes);
	  if (keys.length === 0) return '';
	  return keys.reduce((string, key) => `${ string } ${ key }="${ attributes[key] }"`, '');
	}
	
	var shouldOmitClosingTag = {
	  'area': true,
	  'base': true,
	  'br': true,
	  'col': true,
	  'embed': true,
	  'hr': true,
	  'img': true,
	  'input': true,
	  'keygen': true,
	  'link': true,
	  'meta': true,
	  'param': true,
	  'source': true,
	  'track': true,
	  'wbr': true
	};
	
	function virtualDomToHtml(node) {
	  let prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	  switch (node.constructor) {
	    case _Comment2.default:
	      return `${ prefix }<!--${ node.text }-->\n`;
	    case _Text2.default:
	      return `${ prefix }${ node.text }\n`;
	    case _Element2.default:
	      return shouldOmitClosingTag[node.tag] && node.children.length === 0 ? `${ prefix }<${ node.tag }${ attributesToHtml(node.attributes) }/>\n` : `${ prefix }<${ node.tag }${ attributesToHtml(node.attributes) }>\n${ node.children.map(node => virtualDomToHtml(node, prefix + '  ')).join('') }${ prefix }</${ node.tag }>\n`;
	  }
	}

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map