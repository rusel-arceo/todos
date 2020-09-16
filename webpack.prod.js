const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin       = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode:'production',    //'production', PARA PONERLO EN MODO PRODUCCION Y PARA MODO DESARROLLO ES DEVELOPMENT
    optimization:{
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output:{
        filename:'main.[contentHash].js'  
    },

    module:
        {
        rules:        
            [
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: "babel-loader",
                     // options: {
                     //   presets: ['@babel/preset-env'] // Esto se configurará en .babelrc
                     // }
                    }
                  },
                {
                    test: /\.css$/,
                    exclude:/style\.css$/,
                    loader:['style-loader',
                    'css-loader']
               },
               {
                    test: /style\.css$/,
                    use:[MiniCssExtractPlugin.loader,
                    'css-loader']
               },
                {
                    test: /\.html$/i,
                    loader:'html-loader',
                    options:
                    {
                        attributes: false,
                        minimize:false
                    },
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use:
                    [ 
                        {
                            loader:'file-loader',
                            options: 
                            {
                                esModule: false
                            }   
                        }
                    ]
               },

            ]
        },
        plugins:
        [
            new CleanWebpackPlugin(
            ),
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contentHash].css',
                ignoreOrder:false,
            }),
            new CopyPlugin({
                patterns:[
                { from: './src/assets', to: 'assets/' },               
                ],
            }),
            new MinifyPlugin(

             ),
        ]

}