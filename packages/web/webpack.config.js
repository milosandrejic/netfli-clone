const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config();

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    return {
        devtool: isDevelopment && "eval-cheap-source-map",
        entry: {
            index: "./src/index.jsx",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: isProduction ? "static/[name].[contenthash].js" : "static/[name].js",
            publicPath: "/",
        },
        target: "web",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: [
                                "babel-plugin-styled-components"
                            ]
                        }
                    }
                },
                {
                    test: /\.(png|svg|jpg)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src/index.html"),
                inject: true
            }),
            new WorkboxPlugin.GenerateSW({
                swDest: "service-worker.js",
                clientsClaim: true,
                skipWaiting: true,
                maximumFileSizeToCacheInBytes: 5000000
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env)
             })
        ],
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    parallel: true
                })
            ],
            splitChunks: {
                chunks: "all",
                minSize: 10000,
                maxInitialRequests: 20,
                maxAsyncRequests: 20,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module, chunk, cacheGroupKey) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                            )[1];
    
                            return `${cacheGroupKey}.${packageName.replace("@", "")}`;
                        }
                    },
                    common: {
                        minChunks: 2,
                        priority: -10
                    }
                },
            },
            runtimeChunk: "single",
        },
        devServer: {
            contentBase: "./dist",
            port: 6001,
            historyApiFallback: true,
            overlay: true,
        },
        resolve: {
            extensions: [".js", ".jsx"],
            modules: [
                path.resolve("src"),
                "node_modules",
            ],
            preferRelative: true
        }
    }
}