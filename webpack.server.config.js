const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { IgnorePlugin } = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const buildPath = path.resolve(__dirname, "server");
const environment = process.env.NODE_ENV;

module.exports = {
  target: "node",
  entry: {
    app: "./server/index.ts",
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: __dirname + "/server/tsconfig.json",
      }),
    ],
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
  plugins: [
    new IgnorePlugin(/^pg-native$/),
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "[id].css",
    }),
  ],
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
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: __dirname + "/server/tsconfig.json",
        },
      },
    ],
  },
};
