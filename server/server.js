// import global vars for a whole app
require('../globals');

// path
// — is a tiny, but a useful utility that helps to deal with roots/paths of the files in App project
const path = require('path');
const browserSync = require('browser-sync');

// historyApiFallback
// - responses for browser history updating during navigation on app pages
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');

// webpackDevMiddleware and webpackHotMiddleware
// — they are a sweet couple that will helEp us with Hot Module Replacement(HMR) during development

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const bundler = webpack(webpackConfig);

// =========================================================
// WEBPACK MIDDLEWARE CONFIGURATION
// =========================================================
const devMiddlewareOptions = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
};

// =========================================================
// Server Configuration
// =========================================================
browserSync({
  open: false,
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: true
  },
  // let us tune our server in various ways. In our case we need to inject the entry point of our App by baseDir prop
  // and allow the HMR by injecting webpackDevMiddleware and webpackHotMiddleware throw the middleware prop in it.
  server: {
    baseDir: path.resolve(__dirname, '../src'),
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(bundler, devMiddlewareOptions),
      webpackHotMiddleware(bundler)
    ]
  },
  // also an important prop to configure, because it will watch for all file types in our app.
  // Don’t miss any file type that you need to reload!
  files: [
    'src/../*.tsx',
    'src/../*.ts',
    'src/../*.jsx',
    'src/../*.js',
    'src/../*.json',
    'src/../*.scss',
    'src/../*.html'
  ]
});
