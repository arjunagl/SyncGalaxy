const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/storesHandler'
    ],
    watch: false,
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            'config/storesSAM.yaml'
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),        
    ],
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '../build'),
        filename: 'storesHandler.js'
    }
}