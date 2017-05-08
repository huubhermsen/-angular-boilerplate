/**
 * Constants
 */
const PORT = 3000;
const ENTRY_POINTS = ["inline", "polyfills", "vendor", "bootstrap"];

/**
 * Helpers
 */
const helpers = require("./helpers");
const autoprefixer = require("autoprefixer");

/**
 * Plugins
 */
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { NoEmitOnErrorsPlugin } = require("webpack");
const { CommonsChunkPlugin } = require("webpack").optimize;

/**
 * Webpack config
 */
const config = {
  resolve: {
    extensions: [
      ".ts",
      ".js"
    ],
    alias: {
      "@app": helpers.root("src/app"),
      "image": helpers.root("src/image")
    }
  },

  entry: {
    polyfills: helpers.root("src/polyfills.ts"),
    bootstrap: helpers.root("src/bootstrap.ts")
  },

  output: {
    path: helpers.root("dist"),
    filename: "[name].[hash].js",
    chunkFilename: "[id].[hash].chunk.js"
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          "raw-loader"
        ]
      },
      {
        test: /\.pug$/,
        use: [
          "html-loader",
          "pug-html-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: helpers.appPath,
        exclude: helpers.root("src/app/default.scss"),
        use: [
          "exports-loader?module.exports.toString()",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                helpers.root("src/sass")
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: helpers.root("src/app/default.scss"),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
              {
              loader: "postcss-loader",
              options: {
                plugins: () => [autoprefixer]
              }
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: [
                  helpers.root("src/sass")
                ]
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin(),
    new CommonsChunkPlugin({
      name: "inline",
      minChunks: null
    }),
    new CommonsChunkPlugin({
      name: "vendor",
      minChunks: (module) => (module) => module.resource && module.resource.startsWith(helpers.nodeModulesPath),
      chunks: [
        "bootstrap"
      ]
    }),
    new ExtractTextPlugin("assets/default.[hash].css"),
    new HtmlWebpackPlugin({
      template: helpers.root("src/index.pug"),
      chunksSortMode: (left, right) => {
        let leftIndex = ENTRY_POINTS.indexOf(left.names[0]);
        let rightindex = ENTRY_POINTS.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        } else if (leftIndex < rightindex) {
          return -1;
        } else {
          return 0;
        }
      }
    })
  ],

  node: {
    fs: "empty",
    global: true,
    crypto: "empty",
    tls: "empty",
    net: "empty",
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};

module.exports = {
  config,
  PORT
}
