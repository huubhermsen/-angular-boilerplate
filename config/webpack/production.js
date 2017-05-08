/**
 * Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = "development";
const AOT_ENABLED = true;

/**
 * Helpers
 */
const WebpackMerge = require("webpack-merge");
const common = require("./common");
const helpers = require("./helpers");

/**
 * Plugins
 */
const { DefinePlugin, ContextReplacementPlugin, optimize } = require("webpack");
const { UglifyJsPlugin } = optimize;
const { AotPlugin } = require("@ngtools/webpack");

/**
 * Webpack config
 */
const config = WebpackMerge(common.config, {
  module: {
    rules: []
  },

  plugins: [
    new DefinePlugin({
      "process.env": {
        "ENV": JSON.stringify(ENV)
      }
    }),
    new UglifyJsPlugin({
      mangle: {
        screw_ie8: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false
      }
    })
  ]
});

/**
 * Check for AOT or JIT build
 */
if (!!AOT_ENABLED) {
  // Push ts rule
  config.module.rules.push({
    test: /\.ts$/,
    use: [
      "@ngtools/webpack"
    ]
  });
  // Push AOT plugin
  config.plugins.push(new AotPlugin({
    mainPath: helpers.root("src/bootstrap.ts"),
    tsConfigPath: helpers.root("tsconfig.json")
  }));
} else {
   // Push ts rule
  config.module.rules.push({
    test: /\.ts$/,
    use: [
      "awesome-typescript-loader",
      "angular-router-loader",
      "angular2-template-loader"
    ]
  });
  // Push context plugin
  config.plugins.push(new ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)@angular/,
    helpers.root("src")
  ));
}

module.exports = config;
