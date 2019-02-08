// import global vars for a whole app
require('./globals');

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const debug = require('debug')('app:webpack:config');

// ------------------------------------
// RULES INJECTION!
// ------------------------------------
const rules = [
  // PRELOAD CHECKING
  {
    enforce: 'pre',
    test: /\.(js|jsx)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'eslint-loader',
    options: {
      quiet: true
    }
  },
  {
    enforce: 'pre',
    test: /\.(ts|tsx)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'tslint-loader',
    options: {
      quiet: true,
      tsConfigFile: './tsconfig.json'
    }
  },
  // JAVASCRIPT/JSON
  {
    test: /\.html$/,
    use: {
      loader: 'html-loader'
    }
  },
  {
    test: /\.(js|jsx|ts|tsx)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader'
  },
  {
    type: 'javascript/auto',
    test: /\.json$/,
    loader: 'json-loader'
  },
  // STYLES
  {
    test: /.scss$/,
    use: [
      __PROD__ ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: true,
          localIdentName: '[local]___[hash:base64:5]'
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  // FILE/IMAGES
  {
    test: /\.woff(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
  },
  {
    test: /\.svg(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }
];

// ------------------------------------
// BUNDLES OPTIMIZATION
// ------------------------------------
const optimization = {
  // optimization helps us make a code-splitting in future
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2
    },
    // minimizer is internal optimization prop that can configure app code minified on output by extreme reduce of its size up to 70%
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unused: true,
            dead_code: true,
            warnings: false
          }
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  // performance an additional section that can contain a dev features and minor stuff during development.
  performance: {
    hints: false
  }
};

// ------------------------------------
// STAGE PLUGINS INJECTION! [DEVELOPMENT, PRODUCTION, TESTING]
// ------------------------------------
const stagePlugins = {
  // Bundle Analyzer helps to analyze the code in a visual way by providing us with information about app packages size.
  // It’s a very useful tool when your app grows up.
  test: [new BundleAnalyzerPlugin()],
  development: [
    // helps us to deal with code inserting in a regular html file. Like in old fashion way when we did it manually during code writing
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: false,
      chunksSortMode: 'auto'
    }),
    // that’s one of the our best friend among all plugins.
    // It reduces annoying browsers manual reload on every code change by automation of its process throw file watching
    new webpack.HotModuleReplacementPlugin(),
    // it’s a minor plugin that helps to reduce annoying useless warnings messages from CLI.
    new webpack.NoEmitOnErrorsPlugin()
  ],
  production: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      },
      chunksSortMode: 'auto'
    })
  ]
};

// ------------------------------------
// STAGE CONFIGURATION INJECTION! [DEVELOPMENT, PRODUCTION]
// ------------------------------------
const stageConfig = {
  test: {
    devtool: 'source-map',
    stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  },
  development: {
    devtool: 'source-map',
    stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  },
  production: {
    devtool: 'source-map',
    stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  }
};

// ------------------------------------
// WEBPACK CONFIGURATION
// ------------------------------------

const createConfig = () => {
  debug('Creating configuration.');
  debug(`Enabling devtool for '${__NODE_ENV__} Mode!'`);

  const webpackConfig = {
    mode: __DEV__ ? 'development' : 'production',
    name: 'client',
    target: 'web',
    devtool: stageConfig[__NODE_ENV__].devtool,
    stats: stageConfig[__NODE_ENV__].stats,
    module: {
      rules: [...rules]
    },
    ...optimization,
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }
  };

  // ------------------------------------
  // Entry Points
  // It says webpack were from it should start to process an App code.
  // Here you can admit that we include some strange additional code. It helps us to use webpack HMR directly in App
  // ------------------------------------
  webpackConfig.entry = {
    app: ['babel-polyfill', path.resolve(__dirname, 'src/index.tsx')].concat(
      'webpack-hot-middleware/client?path=/__webpack_hmr'
    )
  };

  // ------------------------------------
  // Bundle externals
  // it’s a very tricky part that helps us to fully exclude react package from the bundles size.
  // We take it from CDN inside index.html file. It makes our bundles lightweight
  // ------------------------------------
  webpackConfig.externals = {
    react: 'React',
    'react-dom': 'ReactDOM'
  };

  // ------------------------------------
  // Bundle Output
  // shows how we can get all processed App code from RSK Builder on output.
  // Commonly code chunks should be like: chunk_name.hash_code.js
  // ------------------------------------
  webpackConfig.output = {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  };

  // ------------------------------------
  // Plugins
  // ------------------------------------
  debug(`Enable plugins for '${__NODE_ENV__} Mode!'`);
  // TODO: Don't forget to setup dot env for Define Plugin
  webpackConfig.plugins = [
    new webpack.DefinePlugin({
      __DEV__,
      __PROD__,
      __TEST__
    }),
    ...stagePlugins[__NODE_ENV__]
  ];

  // ------------------------------------
  // Finishing the Webpack configuration!
  // ------------------------------------
  debug(`Webpack Bundles is Ready for '${__NODE_ENV__} Mode!'`);
  return webpackConfig;
};

module.exports = createConfig();
