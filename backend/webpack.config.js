const path = require('path');
const slsw = require('serverless-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "@domain": path.resolve(__dirname, 'src/domain'),
            "@calendar": path.resolve(__dirname, 'src/domain/calendar'),
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
                exclude: /node_modules|\.d\.ts$/,
            },
            {
                test: /\.d\.ts$/,
                loader: 'ignore-loader'
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
        'class-transformer',
        'class-validator',
        'tsoa',
        'typescript',
        'typescript-formatter',
        'inversify',
        'express',
        'body-parser',
        'swagger-ui-express',
        'serverless-http',
        'reflect-metadata',
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                }
            }),
        ],
    },
};
