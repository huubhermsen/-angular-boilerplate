/**
 * Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = "development";

/**
 * Helpers
 */
const WebpackMerge = require("webpack-merge");
const common = require("./common");
const helpers = require("./helpers");

/**
 * Plugins
 */
const { DefinePlugin, ContextReplacementPlugin } = require("webpack");

/**
 * Webpack config
 */
const config = WebpackMerge(common.config, {
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          "awesome-typescript-loader",
          "angular-router-loader",
          "angular2-template-loader"
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      "process.env": {
        "ENV": JSON.stringify(ENV)
      }
    }),
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root("src")
    )
  ],

  devServer: {
    port: common.PORT,
    historyApiFallback: true,
    stats: "minimal",
    inline: true,
    compress: true
  }
});

module.exports = config;
