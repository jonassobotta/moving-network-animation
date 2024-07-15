const path = require('path');

module.exports = {
    entry: './path/to/umdWrapper.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'moving-network-animation.bundle.js',
        library: 'MovingNetworkAnimation',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};