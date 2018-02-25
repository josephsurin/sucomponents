const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const prod = {
    devtool: 'none',

    watch: false, 

    plugins: [
        new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ]
}

module.exports = merge([common, prod])