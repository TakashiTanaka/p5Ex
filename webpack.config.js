const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /* 出力モード */
  mode: process.env.MODE === 'production' ? 'production' : 'development',

  /* エントリーポイント */
  entry: './src/index.js',

  /* 出力先 */
  output: {
    filename: 'p5Ex.js',
    library: {
      name: 'p5Ex',
      type: 'window',
    },
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
        extractComments: false,
      }),
    ],
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
