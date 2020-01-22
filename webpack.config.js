const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const html = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "./"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./"
            }
          },
          "css-loader"
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputpath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new html({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
