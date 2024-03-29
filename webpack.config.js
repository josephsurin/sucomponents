const ExtractTextPlugin = require('extract-text-webpack-plugin')
//const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
// co/\nst BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    devtool: 'eval', //for chrome devtools

    watch: true, //watch project folder

    target: 'electron-main',

    entry: './app/src/entry.js',

    mode: 'development',

    output: { //location and filename for bundled js
        path: __dirname + '/app/build',
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    node: {
        __dirname: false,
        __filename: false
      },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|SuComponents/,
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({ //extract css to separate file in build path named bundle.css, see config below
                  use: ["css-loader", "sass-loader"]
                })
              },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: 'img/[name].[ext]'
                }
            },
           // { test: /\.html$/, use: ["html-loader"] }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'css/bundle.css'
        }),
        // new HtmlWebpackPlugin({
        //     template: "app/index.html"
        // })
]

}