const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
            publicPath: "/"
        },
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
                                "@babel/plugin-transform-runtime",
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
        devServer: {
            contentBase: "./dist",
            port: 6001,
            historyApiFallback: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src/index.html"),
                inject: true
            })
        ],
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