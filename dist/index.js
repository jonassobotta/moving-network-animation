"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    // Node and CommonJS-like environments that support module.exports
    module.exports = factory();
  } else {
    // Browser globals (root is typically `window`)
    root.MovingNetworkAnimation = factory();
  }
})(typeof self !== 'undefined' ? self : void 0, function () {
  // Define default settings inside the factory function
  var defaultSettings = {
    nodeColor: "rgba(255,255,255)",
    edgeColor: "rgba(0,181,255)",
    maxNodes: 250,
    minRadius: 2,
    radiusVariance: 2,
    minSpeed: 0.5,
    speedVariance: 1,
    connectionRadius: 150
  };

  // MovingNetworkAnimation class definition
  var MovingNetworkAnimation = /*#__PURE__*/function () {
    function MovingNetworkAnimation(parentElement, options) {
      _classCallCheck(this, MovingNetworkAnimation);
      this.settings = _objectSpread(_objectSpread({}, defaultSettings), options);
      this.parentElement = parentElement;
      this.init();
    }
    return _createClass(MovingNetworkAnimation, [{
      key: "init",
      value: function init() {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.parentElement.offsetWidth;
        this.canvas.height = this.parentElement.offsetHeight;
        this.parentElement.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.nodes = Array.from({
          length: this.settings.maxNodes
        }, function () {
          return new Node(_this.canvas.width, _this.canvas.height, _this.settings);
        });
        window.addEventListener('resize', this.resize.bind(this), false);
        this.requestId = requestAnimationFrame(this.animate.bind(this));
      }
    }, {
      key: "resize",
      value: function resize() {
        this.canvas.width = this.parentElement.offsetWidth;
        this.canvas.height = this.parentElement.offsetHeight;
      }
    }, {
      key: "animate",
      value: function animate() {
        var _this2 = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.nodes.forEach(function (node) {
          node.update(_this2.canvas.width, _this2.canvas.height);
          node.draw(_this2.context);
        });
        this.connectNodes();
        this.requestId = requestAnimationFrame(this.animate.bind(this));
      }
    }, {
      key: "connectNodes",
      value: function connectNodes() {
        var _this3 = this;
        this.nodes.forEach(function (node) {
          _this3.nodes.forEach(function (otherNode) {
            if (node !== otherNode) {
              var dist = node.distanceTo(otherNode);
              if (dist < _this3.settings.connectionRadius) {
                _this3.context.beginPath();
                _this3.context.moveTo(node.x, node.y);
                _this3.context.lineTo(otherNode.x, otherNode.y);
                var opacity = 1 - dist / _this3.settings.connectionRadius;
                _this3.context.strokeStyle = "rgba(".concat(_this3.settings.edgeColor.match(/\d+/g).join(','), ",").concat(opacity, ")");
                _this3.context.lineWidth = 0.5;
                _this3.context.stroke();
              }
            }
          });
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        cancelAnimationFrame(this.requestId);
        window.removeEventListener('resize', this.resize.bind(this));
        this.parentElement.removeChild(this.canvas);
      }
    }]);
  }();
  var Node = /*#__PURE__*/function () {
    function Node(width, height, settings) {
      _classCallCheck(this, Node);
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.color = settings.nodeColor;
      this.radius = settings.minRadius + Math.random() * settings.radiusVariance;
      this.speed = settings.minSpeed + Math.random() * settings.speedVariance;
      this.direction = Math.random() * 2 * Math.PI;
      this.velocity = {
        x: Math.cos(this.direction) * this.speed,
        y: Math.sin(this.direction) * this.speed
      };
    }
    return _createClass(Node, [{
      key: "update",
      value: function update(width, height) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Handle edge collisions
        if (this.x <= 0 || this.x >= width) {
          this.velocity.x *= -1;
        }
        if (this.y <= 0 || this.y >= height) {
          this.velocity.y *= -1;
        }
      }
    }, {
      key: "draw",
      value: function draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }, {
      key: "distanceTo",
      value: function distanceTo(otherNode) {
        var dx = this.x - otherNode.x;
        var dy = this.y - otherNode.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }]);
  }(); // Return the constructor function
  return MovingNetworkAnimation;
});