# Moving Network Animation

This project uses JavaScript and HTML5 Canvas to animate a network of nodes and edges. The nodes dynamically interact and form edges based on their proximity, creating a network-like pattern.

![Example Image](https://github.com/jonassobotta/moving-network-animation/blob/main/docs/img/network-example.png?raw=true)


## Installation

To install and run the Moving Network Animation on your local machine, follow these simple steps:

```bash
npm install moving-network-installation
```

## Usage

find usage examples on the [GitHub page](https://github.com/jonassobotta/moving-network-animation) of this project in the examples folder.

## Configuration

The behavior of the nodes and their network edges can be customized by adjusting the settings in the settings object within the script:

```javascript
const settings = {
    nodeColor: "rgba(255,255,255)",
    edgeColor: "rgba(0,181,255)",
    maxNodes: 250,
    minRadius: 2,
    radiusVariance: 2,
    minSpeed: 0.5,
    speedVariance: 1,
    connectionRadius: 150
};