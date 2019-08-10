const path = require("path");
const webpack = require("webpack");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: "none",
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      {
        // loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
        // query: {cacheDirectory: true}
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      "fetch": "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),
    new WorkboxPlugin.GenerateSW({
      cleanupOutdatedCaches: true,
      swDest: 'sw.js',
      exclude: [/\.(?:png|jpg|jpeg|svg)$/, 'cms.js'],
      runtimeCaching: [{
        urlPattern: /\.(?:svg|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 10,
          },
        },
      },{
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
      },{
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'google-fonts-stylesheets',
        },
      },{
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-webfonts',
          cacheableResponse: {
            statuses: [0, 200],
          },
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      }],
    })
  ],

  context: path.join(__dirname, "src"),
  entry: {
    app: ["./js/app"],
    cms: ["./js/cms"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  externals: [/^vendor\/.+\.js$/]
};
