import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  stats: {
    assets: true,
    errors: true
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true
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
        use: ['style-loader', 'css-loader']
      },
      {

        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: [path.resolve(__dirname, "node_modules/")],
        loader: "url-loader?limit=100"
      }
    ]
  }
}
