const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { IgnorePlugin } = require("webpack");
const environment = process.env.NODE_ENV;
const buildPath = path.resolve(__dirname, "server");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  entry: {
    app: "./server/index.tsx",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  mode: environment,
  output: {
    filename: "index.js",
    path: buildPath,
  },
  devtool: "inline-source-map",
  optimization: {
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.server.json",
        },
      },
    ],
  },
};