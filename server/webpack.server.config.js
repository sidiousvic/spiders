const environment = process.env.NODE_ENV;
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { IgnorePlugin } = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const entryPath = path.resolve(__dirname, "./index.ts");
const buildPath = path.resolve(__dirname, "../build");
const tsConfigPath = path.resolve(__dirname, "tsconfig.server.json");

module.exports = {
  target: "node",
  entry: {
    app: entryPath,
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigPath,
      }),
    ],
  },
  mode: environment,
  output: {
    filename: "server.js",
    path: buildPath,
  },
  devtool: "inline-source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          comments: false,
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [new IgnorePlugin(/^pg-native$/)],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          onlyCompileBundledFiles: true,
          configFile: tsConfigPath,
        },
      },
    ],
  },
};
