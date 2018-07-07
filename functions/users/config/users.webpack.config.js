const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        usersHandler: './src/usersHandler'
    },
    watch: false,
    target: 'node',
    externals: [nodeExternals({
        whitelist: [
            'graphql',
            'iterall',
            'apollo-server-lambda',
            'apollo-server-core',
            'apollo-server-module-graphiql',
            'graphql-extensions',
            'apollo-tracing',
            'apollo-cache-control',
            'lodash/head'
        ]
    })],
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader'
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            'config/users.yaml'
        ]),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static'
        })
    ],
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '../build'),
        filename: '[name].js'
    }
}
