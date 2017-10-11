const webpack = require("webpack");
const bundleConfig = require("./public/bundle-config.json");
const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: 'eval-source-map',
    entry:  {
        app: __dirname + "/app/main.js"
    },//已多次提及的唯一入口文件
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '',
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            /**
             下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
             这样webpack打包时，就先直接去这个json文件中把那些预编译的资源弄进来
             **/
            manifest: require('./public/bundle-manifest.json')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'manifest']
        }),
        new HtmlwebpackPlugin({
            filename: 'index.html',
            chunks: ['manifest', 'app'],
            template: __dirname + '/app/app.html',
            bundleName: bundleConfig.bundle.js,
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
            }
        }),

    ]
};