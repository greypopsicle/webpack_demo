const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development', // 开发模式
    entry: [
        '@babel/polyfill',
        path.resolve(__dirname, '../src/main.js')
    ], // 入口文件
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名
        path: path.resolve(__dirname, '../dist'), // 打包后的文件路径
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // 从右向左解析原则
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader',{
                    loader:'postcss-loader',
                    options:{
                        plugins:[require('autoprefixer')]
                    }
                },'less-loader'] // 从右向左解析原则
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new CleanWebpackPlugin(), // 打包输出前清空dist文件夹
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css",
        })
    ]
}