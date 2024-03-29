const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  /* 出力モード */
  mode: process.env.MODE === 'production' ? 'production' : 'development',

  /* エントリーポイント */
  entry: './src/index.ts',

  /* 出力先 */
  output: {
    filename: 'p5ex.js',
    // library: {
    //   name: 'p5ex',
    //   type: 'amd',
    // },
  },

  plugins: [
    // new BundleAnalyzerPlugin()
  ],

  externals: {
    P5: 'p5'
  },

  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
    ],
  },

  /* 最適化 */
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  /* キャッシュをtrueで差分ビルド */
  cache: true,

  /* ソースマップを出力 */
  devtool: 'source-map',

  /* node_modules内のファイルは無視 */
  watchOptions: {
    ignored: /node_modules/,
  },
};
