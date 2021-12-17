const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = (env, argv) => {
    const isDevelopment = argv?.mode === "development";

    return {
        target: "web",
        devtool: (isDevelopment ? "source-map" : false),
        entry: {
            "widgets": "./lib/widgets/index.js",
            "themes": "./lib/themes/index.js"
        },
        watch: isDevelopment,
        output: {
            path: path.resolve("dist"),
            filename: "[name].js",
            globalObject: "this",
            libraryTarget: "umd",
            library: "common",
            sourceMapFilename: "[name]-sourceMap.js"
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
                                        displayName: true
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
        externals: [nodeExternals({
            modulesFromFile: true
        })],
        resolve: {
            extensions: [".js", ".jsx"],
            modules: [
                path.resolve("lib"),
                "node_modules"
            ],
            preferRelative: true,
        }
    }
}