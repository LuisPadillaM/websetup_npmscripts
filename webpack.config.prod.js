import path from 'path';
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default {
  devtool: 'source-map',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),

    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: 'babel-loader',
        options: {
          presets: ["latest", "es2015-node"]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?sourceMap"
        })
      },
      {

        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: [path.resolve(__dirname, "/node_modules/")],
        loader: "url-loader?limit=100"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"]
  }
}
