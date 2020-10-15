const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const environment = process.env.NODE_ENV;
const buildPath = path.resolve(__dirname, "build");
const publicPath = path.resolve(__dirname, "public");
const sharedLoaderOptions = { name: "[name].[ext]" };
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./ui/index.ts",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  mode: environment,
  output: {
    filename: "ui.js",
    path: buildPath,
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: publicPath,
    proxy: {
      "/": "http://localhost:9992" /**@ssr */,
      "/graphql": "http://localhost:9991",
    },
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(publicPath, "index.html"),
    }),
  ],
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
          onlyCompileBundledFiles: true,
          configFile: "tsconfig.ui.json",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              ...sharedLoaderOptions,
            },
          },
        ],
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: "file-loader",
            options: {
              ...sharedLoaderOptions,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              ...sharedLoaderOptions,
            },
          },
        ],
      },
      {
        test: /\.obj$/,
        use: [
          {
            loader: "file-loader",
            options: {
              ...sharedLoaderOptions,
            },
          },
        ],
      },
      {
        test: /\.ico$/,
        use: [
          {
            loader: "file-loader",
            options: {
              ...sharedLoaderOptions,
            },
          },
        ],
      },
    ],
  },
};
