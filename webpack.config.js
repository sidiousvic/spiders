const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const environment = process.env.NODE_ENV;
const buildPath = path.resolve(__dirname, "build");
const publicPath = environment === "development" ? buildPath : "";
const sharedLoaderOptions = { name: "[name].[ext]" };

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  mode: environment,
  output: {
    filename: "[name].bundle.js",
    path: buildPath,
    publicPath: publicPath,
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: buildPath,
    proxy: {
      "/spiders/graphql": "http://localhost:9991",
    },
    historyApiFallback: true,
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
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
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
