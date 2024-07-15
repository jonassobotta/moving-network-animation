const settings = {
    nodeColor: "rgba(255,255,255)",
    edgeColor: "rgba(240,14,14)",
    maxNodes: 250,
    minRadius: 2,
    radiusVariance: 2,
    minSpeed: 0.5,
    speedVariance: 1,
    connectionRadius: 150
};

const edgeRGB = settings.edgeColor.match(/\d+/g);
let width, height, canvas, context, nodes, animationFrameId;

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    adjustCanvasSize();
    createNodes();
    animate();
}

function adjustCanvasSize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function createNodes() {
    nodes = Array.from({ length: settings.maxNodes }, () => new Node());
}

function animate() {
    context.clearRect(0, 0, width, height);
    nodes.forEach(node => {
        node.update();
        node.draw();
        connectNodes(node);
    });
    animationFrameId = requestAnimationFrame(animate);
}

function connectNodes(node) {
    nodes.forEach(target => {
        let dist = distance(node.x, node.y, target.x, target.y);
        let opacity = 1 - dist / settings.connectionRadius;
        if (opacity > 0) {
            context.lineWidth = 0.5;
            context.strokeStyle = `rgba(${edgeRGB[0]},${edgeRGB[1]},${edgeRGB[2]},${opacity})`;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(target.x, target.y);
            context.stroke();
        }
    });
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

class Node {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.color = settings.nodeColor;
        this.radius = settings.minRadius + Math.random() * settings.radiusVariance;
        this.speed = settings.minSpeed + Math.random() * settings.speedVariance;
        this.direction = Math.random() * Math.PI * 2;
        this.velocity = {
            x: Math.cos(this.direction) * this.speed,
            y: Math.sin(this.direction) * this.speed
        };
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.handleEdges();
    }

    handleEdges() {
        if (this.x >= width || this.x <= 0) this.velocity.x *= -1;
        if (this.y >= height || this.y <= 0) this.velocity.y *= -1;
        this.x = Math.max(0, Math.min(this.x, width));
        this.y = Math.max(0, Math.min(this.y, height));
    }

    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}