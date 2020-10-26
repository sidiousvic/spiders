const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const environment = process.env.NODE_ENV;
const sharedLoaderOptions = { name: "[name].[ext]" };

const entryPath = path.resolve(__dirname, "ui/index.ts");
const buildPath = path.resolve(__dirname, "build");
const publicPath = path.resolve(__dirname, "public");
const tsConfigPath = path.resolve(__dirname, "ui/tsconfig.json");

module.exports = {
  entry: {
    app: entryPath,
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
      "/graphql": "http://localhost:9991/graphql",
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: "next",
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
          configFile: tsConfigPath,
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