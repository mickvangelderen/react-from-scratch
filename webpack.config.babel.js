/* eslint-env node */

export default {
  entry: './src/index.js',
  output: {
      path: './public',
      filename: 'index.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    {
      apply(compiler) {
        compiler.plugin('done', function() {
          require.cache = {}
          require('./scripts/build')
        })
      }
    }
  ]
}
