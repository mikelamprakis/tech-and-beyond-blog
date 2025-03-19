module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add markdown loader
      webpackConfig.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      });
      
      // Add buffer polyfill
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          ...webpackConfig.resolve?.fallback,
          "buffer": require.resolve("buffer/"),
        },
      };
      
      // Add buffer plugin
      const webpack = require('webpack');
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      );
      
      return webpackConfig;
    },
  },
}; 