const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'nosources-source-map',
    target: 'node',
    mode: 'production',
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
    },
};
