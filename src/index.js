(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node and CommonJS-like environments that support module.exports
        module.exports = factory();
    } else {
        // Browser globals (root is typically `window`)
        root.MovingNetworkAnimation = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    // Define default settings inside the factory function
    const defaultSettings = {
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
    class MovingNetworkAnimation {
        constructor(parentElement, options) {
            this.settings = {...defaultSettings, ...options};
            this.parentElement = parentElement;
            this.init();
        }

        init() {
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.parentElement.offsetWidth;
            this.canvas.height = this.parentElement.offsetHeight;
            this.parentElement.appendChild(this.canvas);
            this.context = this.canvas.getContext('2d');

            this.nodes = Array.from({ length: this.settings.maxNodes }, () => new Node(this.canvas.width, this.canvas.height, this.settings));

            window.addEventListener('resize', this.resize.bind(this), false);

            this.requestId = requestAnimationFrame(this.animate.bind(this));
        }

        resize() {
            this.canvas.width = this.parentElement.offsetWidth;
            this.canvas.height = this.parentElement.offsetHeight;
        }

        animate() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.nodes.forEach(node => {
                node.update(this.canvas.width, this.canvas.height);
                node.draw(this.context);
            });
            this.connectNodes();
            this.requestId = requestAnimationFrame(this.animate.bind(this));
        }

        connectNodes() {
            this.nodes.forEach(node => {
                this.nodes.forEach(otherNode => {
                    if (node !== otherNode) {
                        const dist = node.distanceTo(otherNode);
                        if (dist < this.settings.connectionRadius) {
                            this.context.beginPath();
                            this.context.moveTo(node.x, node.y);
                            this.context.lineTo(otherNode.x, otherNode.y);
                            const opacity = 1 - dist / this.settings.connectionRadius;
                            this.context.strokeStyle = `rgba(${this.settings.edgeColor.match(/\d+/g).join(',')},${opacity})`;
                            this.context.lineWidth = 0.5;
                            this.context.stroke();
                        }
                    }
                });
            });
        }

        destroy() {
            cancelAnimationFrame(this.requestId);
            window.removeEventListener('resize', this.resize.bind(this));
            this.parentElement.removeChild(this.canvas);
        }
    }

    class Node {
        constructor(width, height, settings) {
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

        update(width, height) {
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

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        distanceTo(otherNode) {
            const dx = this.x - otherNode.x;
            const dy = this.y - otherNode.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    // Return the constructor function
    return MovingNetworkAnimation;
}));