/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Map = __webpack_require__(2);

	var _Map2 = _interopRequireDefault(_Map);

	var _Spirit = __webpack_require__(3);

	var _Spirit2 = _interopRequireDefault(_Spirit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Zane Wang on 2016/12/2.
	 */
	var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60); //每帧1000/60ms
	};

	var spirit = void 0;

	var canvas = document.getElementById("mainCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	_Map2.default.init({
	    canvas: canvas,
	    width: canvas.width,
	    height: canvas.height
	});

	function initSpirit() {
	    spirit = new _Spirit2.default({
	        x: _Map2.default.width / 2,
	        y: _Map2.default.height / 2,
	        radius: 5,
	        color: "red"
	    });
	}

	function animate() {
	    _Map2.default.render();
	    spirit.render();
	    raf(animate);
	}

	function start() {
	    initSpirit();
	    animate();
	}

	start();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Zane Wang on 2016/12/2.
	 */
	var Map = function () {
	    function Map() {
	        _classCallCheck(this, Map);
	    }

	    _createClass(Map, [{
	        key: "init",
	        value: function init(options) {
	            this.canvas = options.canvas;
	            this.cxt = this.canvas.getContext("2d");
	            this.width = options.width;
	            this.height = options.height;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            this.cxt.fillStyle = "black";
	            this.cxt.fillRect(0, 0, this.width, this.height);
	        }
	    }]);

	    return Map;
	}();

	exports.default = new Map();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Point2 = __webpack_require__(4);

	var _Point3 = _interopRequireDefault(_Point2);

	var _Map = __webpack_require__(2);

	var _Map2 = _interopRequireDefault(_Map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Zane Wang on 2016/12/2.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	function detect(arr, val) {
	    return arr.some(function (v) {
	        return v.match(val);
	    });
	}
	var devices = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone", "mobile"];
	var agent = navigator.userAgent.toLowerCase();
	var isMobile = detect(devices, agent);

	var Spirit = function (_Point) {
	    _inherits(Spirit, _Point);

	    function Spirit(options) {
	        _classCallCheck(this, Spirit);

	        var _this = _possibleConstructorReturn(this, (Spirit.__proto__ || Object.getPrototypeOf(Spirit)).call(this, options));

	        if (options) {}
	        _this.bind();
	        return _this;
	    }

	    _createClass(Spirit, [{
	        key: 'moveTo',
	        value: function moveTo(x, y) {
	            this.x = x;
	            this.y = y;
	        }
	    }, {
	        key: 'bind',
	        value: function bind() {
	            var _this2 = this;

	            if (isMobile) {
	                window.addEventListener('touchstart', function (e) {
	                    e.preventDefault();
	                    _this2.touchStartX = e.touches[0].x;
	                    _this2.touchStartY = e.touches[0].y;
	                });
	                window.addEventListener('touchmove', function (e) {
	                    e.preventDefault();
	                    var moveX = e.touches[0].x - _this2.touchStartX;
	                    var moveY = e.touches[0].y - _this2.touchStartY;
	                    _this2.moveTo(_this2.x + moveX, _this2.y + moveY);
	                    _this2.touchStartX = e.touches[0].x;
	                    _this2.touchStartY = e.touches[0].y;
	                });
	            } else {
	                window.addEventListener('mousemove', function (e) {
	                    _this2.moveTo(e.clientX, e.clientY);
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            _Map2.default.cxt.fillStyle = this.color;
	            _Map2.default.cxt.beginPath();
	            _Map2.default.cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	            _Map2.default.cxt.closePath();
	            _Map2.default.cxt.fill();
	        }
	    }]);

	    return Spirit;
	}(_Point3.default);

	exports.default = Spirit;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Zane Wang on 2016/12/2.
	 */
	var Point = function Point(options) {
	    _classCallCheck(this, Point);

	    if (options) {
	        this.x = options.x || 1;
	        this.y = options.y || 1;
	        this.radius = options.radius || 10;
	        this.color = options.color || "red";
	    }
	};

	exports.default = Point;

/***/ }
/******/ ]);