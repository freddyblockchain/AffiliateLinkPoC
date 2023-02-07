const webpack = require("webpack");

module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    os: require.resolve("os-browserify"),
    crypto: require.resolve("crypto-browserify"),
    util: require.resolve("util"),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  return config;
};
