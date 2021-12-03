/* eslint-disable no-undef */
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = (env, argv) => ({
    devtool: (argv?.mode ?? "development") === "development" ? "inline-source-map" : false,
    watch: (argv?.mode ?? "development") === "development",
    target: "web",
    entry: {
        "widgets": "./lib/widgets/index.js",
        "themes": "./lib/themes/index.js",
    },
    externals: [nodeExternals({
        modulesFromFile: true
    })],
    output: {
        path: path.resolve("dist"),
        library: "common",
        filename: "[name].js",
        libraryTarget: "umd",
        globalObject: "this"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["@babel/react", "@babel/env"],
                        plugins: [
                            [
                                "babel-plugin-styled-components", {
                                    displayName: true,
                                    preprocess: false
                                }
                            ]
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
    resolve: {
        extensions: [".js", ".jsx"],
        modules: [
            path.resolve("lib"),
            "node_modules"
        ],
        preferRelative: true
    }
});
