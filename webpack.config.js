const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  devServer: {
  proxy: [
    {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true 
        }
      }
    ],
    static: {
      directory: path.join(__dirname, 'client/public'),
      watch: true
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'icons/OS_icons/'
            }           
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
