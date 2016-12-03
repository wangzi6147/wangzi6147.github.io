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

	var _Enemy = __webpack_require__(5);

	var _Enemy2 = _interopRequireDefault(_Enemy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60); //每帧1000/60ms
	}; /**
	    * Created by Zane Wang on 2016/12/2.
	    */


	var spirit = void 0;
	var enemies = [];
	var timer = void 0;
	var holdingTime = 0;
	var bestTime = 0;

	var enemyCount = 10;
	var pointRadius = 30;
	var canvas = document.getElementById("mainCanvas");
	var cxt = canvas.getContext("2d");
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
	        radius: 30,
	        color: 'green',
	        enemies: enemies
	    });
	}

	function initEnemies() {
	    enemies = [];
	    for (var i = 0; i < enemyCount; i++) {
	        var x = pointRadius + Math.random() * (_Map2.default.width - 2 * pointRadius);
	        var y = pointRadius + Math.random() * (_Map2.default.height - 2 * pointRadius);
	        var vx = Math.random() * 2 - 1;
	        var vy = Math.random() * 2 - 1;
	        var speed = Math.random() * 10 + 10;
	        enemies.push(new _Enemy2.default({
	            x: x,
	            y: y,
	            radius: pointRadius,
	            color: "red",
	            vx: vx,
	            vy: vy,
	            speed: speed
	        }));
	    }
	}

	function collision(enemy, spirit) {
	    var diffX = enemy.x - spirit.x;
	    var diffY = enemy.y - spirit.y;
	    return Math.hypot(diffX, diffY) < enemy.radius + spirit.radius;
	}

	function renderTimer() {
	    cxt.textAlign = 'left';
	    cxt.textBaseline = 'top';
	    cxt.strokeStyle = 'white';
	    cxt.font = 'bold 36px arial';
	    cxt.fillStyle = 'white';
	    cxt.fillText("Time: " + holdingTime + "  Best: " + bestTime, 5, 10);
	}
	function animate() {
	    _Map2.default.render();
	    renderTimer();
	    if (spirit.dead) {
	        reset();
	    }
	    spirit.render();
	    for (var i = 0; i < enemyCount; i++) {
	        enemies[i].render();
	        if (collision(enemies[i], spirit)) {
	            spirit.dead = true;
	        }
	    }
	    raf(animate);
	}

	function initTimer() {
	    holdingTime = 0;
	    clearTimeout(timer);
	    var time = function time() {
	        timer = setTimeout(function () {
	            holdingTime++;
	            if (bestTime < holdingTime) {
	                bestTime = holdingTime;
	            }
	            if (holdingTime % 5 === 0) {
	                for (var i = 0; i < enemies.length; i++) {
	                    enemies[i].speedUp();
	                }
	            }
	            clearTimeout(timer);
	            time();
	        }, 1000);
	    };
	    time();
	}
	function reset() {
	    initEnemies();
	    initSpirit();
	    initTimer();
	}

	function start() {
	    reset();
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
	        return val.match(v);
	    });
	}
	var devices = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone", "mobile"];
	var agent = navigator.userAgent.toLowerCase();
	var isMobile = detect(devices, agent);
	var lastRoundX = -1;
	var lastRoundY = -1;

	var Spirit = function (_Point) {
	    _inherits(Spirit, _Point);

	    function Spirit(options) {
	        _classCallCheck(this, Spirit);

	        var _this = _possibleConstructorReturn(this, (Spirit.__proto__ || Object.getPrototypeOf(Spirit)).call(this, options));

	        if (options) {
	            _this.enemies = options.enemies;
	        }
	        if (lastRoundX != -1) {
	            _this.touchStartX = lastRoundX;
	        }
	        if (lastRoundY != -1) {
	            _this.touchStartY = lastRoundY;
	        }
	        _this.dead = false;
	        _this.bind();
	        return _this;
	    }

	    _createClass(Spirit, [{
	        key: 'bind',
	        value: function bind() {
	            var _this2 = this;

	            if (isMobile) {
	                window.addEventListener('touchstart', function (e) {
	                    e.preventDefault();
	                    if (!_this2.dead) {
	                        lastRoundX = e.touches[0].pageX;
	                        lastRoundY = e.touches[0].pageY;
	                        _this2.touchStartX = e.touches[0].pageX;
	                        _this2.touchStartY = e.touches[0].pageY;
	                    }
	                });
	                window.addEventListener('touchmove', function (e) {
	                    e.preventDefault();
	                    if (!_this2.dead) {
	                        var moveX = e.touches[0].pageX - _this2.touchStartX;
	                        var moveY = e.touches[0].pageY - _this2.touchStartY;
	                        _this2.moveTo(_this2.x + moveX, _this2.y + moveY);
	                        _this2.touchStartX = e.touches[0].pageX;
	                        _this2.touchStartY = e.touches[0].pageY;
	                    }
	                });
	            } else {
	                //TODO: Coordinate transformation
	                window.addEventListener('mousemove', function (e) {
	                    _this2.moveTo(e.clientX, e.clientY);
	                });
	            }
	        }
	    }]);

	    return Spirit;
	}(_Point3.default);

	exports.default = Spirit;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Zane Wang on 2016/12/2.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _Map = __webpack_require__(2);

	var _Map2 = _interopRequireDefault(_Map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = function () {
	    function Point(options) {
	        _classCallCheck(this, Point);

	        if (options) {
	            this.x = options.x || 1;
	            this.y = options.y || 1;
	            this.radius = options.radius || 10;
	            this.color = options.color || "red";
	        }
	    }

	    _createClass(Point, [{
	        key: "moveTo",
	        value: function moveTo(x, y) {
	            x = x < this.radius ? this.radius : x;
	            x = x > _Map2.default.width - this.radius ? _Map2.default.width - this.radius : x;
	            y = y < this.radius ? this.radius : y;
	            y = y > _Map2.default.height - this.radius ? _Map2.default.height - this.radius : y;
	            this.x = x;
	            this.y = y;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            _Map2.default.cxt.fillStyle = this.color;
	            _Map2.default.cxt.beginPath();
	            _Map2.default.cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	            _Map2.default.cxt.closePath();
	            _Map2.default.cxt.fill();
	        }
	    }]);

	    return Point;
	}();

	exports.default = Point;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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


	var Enemy = function (_Point) {
	    _inherits(Enemy, _Point);

	    function Enemy(options) {
	        _classCallCheck(this, Enemy);

	        var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, options));

	        if (options) {
	            _this.vx = options.vx || 1;
	            _this.vy = options.vy || 1;
	            _this.speed = options.speed;
	        }
	        return _this;
	    }

	    _createClass(Enemy, [{
	        key: 'speedUp',
	        value: function speedUp() {
	            this.speed++;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var nextX = this.x + this.vx * this.speed;
	            var nextY = this.y + this.vy * this.speed;
	            if (this.x + this.vx * this.speed < this.radius || this.x + this.vx * this.speed > _Map2.default.width - this.radius) {
	                this.vx *= -1;
	            }
	            if (this.y + this.vy * this.speed < this.radius || this.y + this.vy * this.speed > _Map2.default.height - this.radius) {
	                this.vy *= -1;
	            }
	            this.x = this.x + this.vx * this.speed;
	            this.y = this.y + this.vy * this.speed;
	            _get(Enemy.prototype.__proto__ || Object.getPrototypeOf(Enemy.prototype), 'render', this).call(this);
	        }
	    }]);

	    return Enemy;
	}(_Point3.default);

	exports.default = Enemy;

/***/ }
/******/ ]);