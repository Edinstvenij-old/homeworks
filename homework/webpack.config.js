const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "homework_22/homework_22.1/src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "homework_22/homework_22.1/src/index.html"
      ),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({ filename: "styles.css" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "homework_22/homework_22.1/src/images"),
          to: "images",
        },
      ],
    }),
    new ImageMinimizerPlugin({
      test: /\.(png|jpe?g|gif)$/i,
      minimizer: [
        {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              // Сжатие для JPEG с качеством 70%
              ["imagemin-mozjpeg", { quality: 70 }],
              // Сжатие для PNG с качеством от 0.5 до 0.8
              ["imagemin-pngquant", { quality: [0.5, 0.8] }],
            ],
          },
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    watchFiles: ["homework_22/homework_22.1/src/**/*"],
  },
};
