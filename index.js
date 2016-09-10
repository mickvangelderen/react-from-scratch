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
	
	var _data = __webpack_require__(1);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _Element = __webpack_require__(5);
	
	var _Element2 = _interopRequireDefault(_Element);
	
	var _Text = __webpack_require__(8);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	const NO_ATTRIBUTES = {};
	const NO_EVENTS = {};
	const NO_CHILDREN = [];
	
	function has(object, property) {
	  return Object.prototype.hasOwnProperty.call(object, property);
	}
	
	function createVirtualDomFromDom(node) {
	  let element;
	  switch (node.nodeType) {
	    case Node.ELEMENT_NODE:
	      element = new _Element2.default(node.tagName.toLowerCase(), Array.prototype.reduce.call(node.attributes, (map, _ref) => {
	        let name = _ref.name;
	        let value = _ref.value;
	
	        map[name] = value;
	        return map;
	      }, {}), NO_EVENTS, Array.prototype.map.call(node.childNodes, createVirtualDomFromDom));
	      break;
	    case Node.TEXT_NODE:
	      element = new _Text2.default(node.nodeValue);
	      break;
	    case Node.COMMENT_NODE:
	      element = new Comment(node.nodeValue);
	      break;
	    default:
	      throw new Error('Cannot convert nodeType ' + node.nodeType + ' to virtual dom.');
	  }
	  element.element = node;
	  return element;
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
	
	  if (actual.constructor !== desired.constructor) {
	    // Replace actual by desired.
	    desired.mount(parent, actual.element);
	    actual.unmount(parent);
	    return;
	  }
	
	  switch (actual.constructor) {
	    case _Element2.default:
	      if (actual.tag !== desired.tag) {
	        // Replace actual by desired.
	        desired.mount(parent, actual.element);
	        actual.unmount(parent);
	        return;
	      } else {
	        Object.keys(actual.attributes).forEach(key => {
	          if (has(desired.attributes, key)) {
	            if (actual.attributes[key] !== desired.attributes[key]) {
	              // Attribute changed.
	              actual.element.setAttribute(key, desired.attributes[key]);
	              if (key === 'value') {
	                actual.element.value = desired.attributes[key];
	              }
	            } else {
	              // Attribute unchanged.
	            }
	          } else {
	            // Attribute removed.
	            actual.element.removeAttribute(key);
	          }
	        });
	        Object.keys(desired.attributes).forEach(key => {
	          if (has(actual.attributes, key)) {
	            // Already handled
	          } else {
	            // Attribute added.
	            actual.element.setAttribute(key, desired.attributes[key]);
	            if (key === 'value') {
	              actual.element.value = desired.attributes[key];
	            }
	          }
	        });
	
	        Object.keys(actual.events).forEach(key => {
	          if (has(desired.events, key)) {
	            if (actual.events[key] !== desired.events[key]) {
	              actual.element.removeEventListener(key, actual.events[key], false);
	              actual.element.addEventListener(key, desired.events[key], false);
	            }
	          } else {
	            actual.element.removeEventListener(key, actual.events[key], false);
	          }
	        });
	
	        Object.keys(desired.events).forEach(key => {
	          if (has(actual.events, key)) {
	            // Already handled
	          } else {
	            actual.element.addEventListener(key, desired.events[key], false);
	          }
	        });
	
	        for (let i = 0, l = Math.max(actual.children.length, desired.children.length); i < l; i++) {
	          reconcile(actual.element, actual.children[i], desired.children[i]);
	        }
	
	        desired.element = actual.element;
	        actual.element = null;
	      }
	      break;
	    case _Text2.default:
	    case Comment:
	      if (actual.text !== desired.text) {
	        actual.element.nodeValue = desired.text;
	      }
	      desired.element = actual.element;
	      actual.element = null;
	      break;
	  }
	}
	
	function getRoot() {
	  return document.getElementById('root');
	}
	
	let actual = createVirtualDomFromDom(getRoot());
	
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
	
	    render();
	  }, 1000);
	
	  _data2.default.signInFormDisabled = true;
	
	  render();
	}
	
	function signInFormUsernameInput(event) {
	  console.log(event.target.value);
	
	  _data2.default.username = event.target.value;
	
	  if (_data2.default.username === '') {
	    _data2.default.signInFormValidUsername = false;
	  } else {
	    _data2.default.signInFormValidUsername = true;
	  }
	
	  render();
	}
	
	function signInFormPasswordChange(event) {
	  _data2.default.password = event.target.value;
	
	  render();
	}
	
	function renderSignInForm(data) {
	  return new _Element2.default('form', NO_ATTRIBUTES, { submit: signInFormSubmit }, [new _Element2.default('div', { class: ['form-group'].concat(_toConsumableArray(data.signInFormValidUsername ? ['has-success'] : ['has-error'])).join(' ') }, NO_EVENTS, [new _Element2.default('label', { for: 'username' }, NO_EVENTS, [new _Text2.default('Username')]), new _Element2.default('input', { type: 'text', class: 'form-control', id: 'username', placeholder: 'Username', value: data.username }, { input: signInFormUsernameInput }, NO_CHILDREN)].concat(_toConsumableArray(data.signInFormValidUsername ? [] : [new _Element2.default('span', { class: 'help-block' }, NO_EVENTS, [new _Text2.default('Please provide a username.')])]))), new _Element2.default('div', { class: 'form-group' }, NO_EVENTS, [new _Element2.default('label', { for: 'password' }, NO_EVENTS, [new _Text2.default('Password')]), new _Element2.default('input', { type: 'password', class: 'form-control', id: 'password', placeholder: 'Password', value: data.password }, { change: signInFormPasswordChange }, NO_CHILDREN)]), new _Element2.default('button', { class: 'btn btn-primary', type: 'submit', disabled: data.signInFormDisabled }, NO_EVENTS, [new _Text2.default('Sign In')])]);
	}
	
	function activeSessionFormActiveSessionChange(event) {
	  _data2.default.activeSessionId = event.target.value;
	  window.history.pushState(null, null, `${ location.pathname }?activeSessionId=${ _data2.default.activeSessionId }`);
	
	  render();
	}
	
	function renderActiveSessionForm(data) {
	  return new _Element2.default('form', NO_ATTRIBUTES, NO_EVENTS, [new _Element2.default('div', { class: 'form-group' }, NO_EVENTS, [new _Element2.default('label', { for: 'active-session' }, NO_EVENTS, [new _Text2.default('Active Session')]), new _Element2.default('select', { class: 'form-control', id: 'active-session' }, { change: activeSessionFormActiveSessionChange }, data.sessions.map(session => {
	    const user = data.users.filter(user => user.id === session.userId)[0];
	    return new _Element2.default('option', { value: session.id, selected: session.id === data.activeSessionId }, NO_EVENTS, [new _Text2.default(user.name)]);
	  }))])]);
	}
	
	function renderActiveUser(data) {
	  const activeSession = data.sessions.filter(_ref2 => {
	    let id = _ref2.id;
	    return id === data.activeSessionId;
	  })[0];
	  const activeUser = activeSession ? data.users.filter(_ref3 => {
	    let id = _ref3.id;
	    return id === activeSession.userId;
	  })[0] : undefined;
	  const activeItems = activeUser ? data.items.filter(_ref4 => {
	    let userId = _ref4.userId;
	    return userId === activeUser.id;
	  }) : [];
	
	  return new _Element2.default('div', NO_ATTRIBUTES, NO_EVENTS, activeUser ? [new _Element2.default('p', NO_ATTRIBUTES, NO_EVENTS, [new _Text2.default('Welcome ' + activeUser.name + '.')]), renderItems(activeItems)] : [new _Element2.default('p', NO_ATTRIBUTES, NO_EVENTS, [new _Text2.default('Please sign in.')])]);
	}
	
	function renderItems(items) {
	  return new _Element2.default('ol', NO_ATTRIBUTES, NO_EVENTS, items.map(item => new _Element2.default('li', { 'data-key': item.id }, NO_EVENTS, [new _Text2.default(item.title)])));
	}
	
	function render() {
	  const desired = new _Element2.default('div', { id: 'root', class: 'container' }, NO_EVENTS, [renderSignInForm(_data2.default), renderActiveSessionForm(_data2.default), renderActiveUser(_data2.default), new _Element2.default('span', NO_ATTRIBUTES, NO_EVENTS, [new _Text2.default(new Date().toString())])]);
	
	  reconcile(getRoot().parentNode, actual, desired);
	
	  actual = desired;
	}
	
	render();
	// setInterval(render, 1000)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _queryString = __webpack_require__(2);
	
	var _queryString2 = _interopRequireDefault(_queryString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const qs = _queryString2.default.parse(location.search);
	
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(3);
	var objectAssign = __webpack_require__(4);
	
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
/* 3 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Element;
	
	var _Node = __webpack_require__(6);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	var _util = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Element(tag, attributes, events, children) {
	  _Node2.default.call(this, children);
	  this.tag = (0, _util.expectString)(tag);
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
	
	Element.prototype.toString = function () {
	  const tag = this.tag;
	  const attributes = this.attributes;
	  const children = this.children;
	
	
	  const a = Object.keys(attributes).map(key => `${ key }="${ attributes[key] }"`).join(' ');
	
	  const c = children.map(child => '\t' + child.toString()).join('\n');
	
	  return `<${ tag } ${ a }>\n${ c }\n</${ tag }>`;
	};
	
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Node;
	
	var _util = __webpack_require__(7);
	
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isArray = undefined;
	exports.stringify = stringify;
	exports.isObject = isObject;
	exports.expectObject = expectObject;
	exports.isString = isString;
	exports.expectString = expectString;
	exports.expectArray = expectArray;
	exports.isFunction = isFunction;
	exports.expectFunction = expectFunction;
	exports.isNode = isNode;
	exports.expectNode = expectNode;
	exports.expectAttributes = expectAttributes;
	exports.isBoolean = isBoolean;
	exports.isUndefined = isUndefined;
	exports.expectAttributeValue = expectAttributeValue;
	exports.expectEvents = expectEvents;
	exports.expectChildren = expectChildren;
	
	var _Node = __webpack_require__(6);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function stringify(value) {
	  return JSON.stringify(value);
	}
	
	const isArray = exports.isArray = Array.isArray;
	
	function isObject(value) {
	  return typeof value === 'object' && value !== null;
	}
	
	function expectObject(value) {
	  if (!isObject(value)) throw new TypeError(`Expected an object but got ${ stringify(value) }.`);
	  return value;
	}
	
	function isString(value) {
	  return typeof value === 'string';
	}
	
	function expectString(value) {
	  if (!isString(value)) throw new TypeError(`Expected a string but got ${ stringify(value) }.`);
	  return value;
	}
	
	function expectArray(value) {
	  if (!isArray(value)) throw new TypeError(`Expected an array but got ${ stringify(value) }.`);
	  return value;
	}
	
	function isFunction(value) {
	  return typeof value === 'function';
	}
	
	function expectFunction(value) {
	  if (!isFunction(value)) throw new TypeError(`Expected a function but got ${ stringify(value) }.`);
	  return value;
	}
	
	function isNode(value) {
	  return value instanceof _Node2.default;
	}
	
	function expectNode(value) {
	  if (!isNode(value)) throw new TypeError(`Expected a Node but got ${ stringify(value) }.`);
	  return value;
	}
	
	function expectAttributes(value) {
	  expectObject(value);
	  Object.keys(value).forEach(key => {
	    expectString(key);
	    expectAttributeValue(value[key]);
	  });
	  return value;
	}
	
	function isBoolean(value) {
	  return typeof value === 'boolean';
	}
	
	function isUndefined(value) {
	  return value === void 0;
	}
	
	function expectAttributeValue(value) {
	  if (!(isString(value) || isBoolean(value) || isUndefined(value))) throw new TypeError(`Expected attribute value to be a string, boolean or undefined but got ${ stringify(value) }.`);
	  return value;
	}
	
	function expectEvents(value) {
	  expectObject(value);
	  Object.keys(value).forEach(key => {
	    expectString(key);
	    expectFunction(value[key]);
	  });
	  return value;
	}
	
	function expectChildren(value) {
	  expectArray(value);
	  value.forEach(child => {
	    expectNode(child);
	  });
	  return value;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Text;
	
	var _Node = __webpack_require__(6);
	
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
	
	Text.prototype.toString = function () {
	  return `"${ this.text }"`;
	};
	
	Text.prototype.mount = function (parent, before) {
	  const element = this.element = document.createTextNode(this.text);
	
	  element['@@virtual'] = this;
	
	  if (before) {
	    parent.insertBefore(element, before);
	  } else {
	    parent.appendChild(element);
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map