const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'balllines.js',
    library: 'balllines',
    libraryTarget: 'umd'
  },
  externals: {
    pathfinding: 'pathfinding',
    root: '_'
  }
}
