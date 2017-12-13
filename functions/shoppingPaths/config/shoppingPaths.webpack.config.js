const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        shoppingPathsHandler: './src/shoppingPathsHandler'
    },
    watch: false,
    target: 'node',
    externals: [nodeExternals({
        whitelist: ['graphql', 'iterall']
    })],
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader'
        }]
    },
    plugins: [        
        new CopyWebpackPlugin([
            'config/shoppingPathsSAM.yaml'
        ])
    ],
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '../build'),
        filename: '[name].js'
    }
}
