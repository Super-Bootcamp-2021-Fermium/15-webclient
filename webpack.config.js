const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
    assignment: './src/assignment/main.js',
    worker: './src/assignment/lib/worker/app.js',
    task: './src/assignment/lib/task/app.js',
    performance: './src/assignment/lib/performance/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './www',
    port: 5757,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
