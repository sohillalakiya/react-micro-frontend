const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".css", ".scss", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new ModuleFederationPlugin({
      name: "MICRO",
      remotes: {
        CLIENT1: "CLIENT1@http://localhost:8080/remoteEntry.js",
        CLIENT2: "CLIENT2@http://localhost:8081/remoteEntry.js"
      },
    }),
  ],
};