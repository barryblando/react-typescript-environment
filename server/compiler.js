// import global vars for a whole app
require('../globals');

const debug = require('debug')('app:build:webpack-compiler');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

// -----------------------------
// READING WEBPACK CONFIGURATION
// -----------------------------
function webpackCompiler() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    compiler.run((err, stats) => {
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err);

        return reject(err);
      }

      const jsonStats = stats.toJson();

      debug('Webpack compilation is completed.');

      resolve(jsonStats);
    });
  });
}

// In the config above we have a regular function webpackCompiler that stands like a handler of compilation process.
// It uses the webpack package and webpack.config.js file that we’ve previously created.
// In the end of processing, it will return a Promise-based response once the whole app code will be compiled.
// But now we need to use this function somehow. Let’s do this by creating another wrapper named compile:

// -----------------------------
// STARTING APP COMPILATION PROCESS
// -----------------------------
const compile = () => {
  debug('Starting compiler.');

  return Promise.resolve()
    .then(() => webpackCompiler())
    .then(() => {
      debug('Compilation completed successfully.');
    })
    .catch(err => {
      debug('Compiler encountered an error.', err);

      process.exit(1);
    });
};

compile();
