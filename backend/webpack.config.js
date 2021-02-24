const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    devtool: slsw.lib.webpack.isLocal ? 'source-map' : false,
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
        },
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                options: {transpileOnly: true},
            },
            {
                test: /\.js$/,
                use: ["remove-hashbag-loader"],
            },
        ],
    },
    resolveLoader: {
        alias: {
            "remove-hashbag-loader": path.join(__dirname, "./loaders/remove-hashbag-loader"),
        },
    },
    externals: [
        'aws-sdk',
    ],
};
