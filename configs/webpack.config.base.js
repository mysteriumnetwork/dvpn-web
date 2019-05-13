/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack'
import path from 'path'
import { dependencies } from '../package.json'

export default {
  externals: [...Object.keys(dependencies || {})],

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          'ts-loader',
        ],
      },
    ],
  },

  output: {
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['dll', 'node_modules'],
    alias: {
      app: path.resolve(__dirname, '../app/')
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new webpack.NamedModulesPlugin(),
  ],

  node: {
    fs: 'empty',
    net: 'empty'
  },


}
