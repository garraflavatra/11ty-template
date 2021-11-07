const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = {
  entry: function () {
    let entries = {
      styles: "./assets/style/bundle.js",
    };
    glob.sync("./assets/js/*.js").forEach((file) => {
      entries[path.basename(file, ".js")] = file;
    });
    return entries;
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css",
    }),
    new WebpackAssetsManifest({}),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: __dirname + "/out/_proc",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
