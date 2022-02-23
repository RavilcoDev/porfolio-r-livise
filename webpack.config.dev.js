const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv= require('dotenv-webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    mode:'development',
    // watch:true,
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader']
            },
            {
                test: /\.(woff|eot|ttf|svg)(\?v=\w+)?$/,
                type: "asset/resource",
                generator: {
                    filename : 'assets/fonts/[name][contenthash][ext][query]',
                  }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new Dotenv()
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3006,
      },
};
