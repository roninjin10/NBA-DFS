import webpack from 'webpack'
import { webpackConfig } from '../webpack'
const WebpackDevServer = require('webpack-dev-server')

const PORT = '8080'

async function runWebpack() {
  return new Promise((resolve, reject) => {
    new WebpackDevServer(webpack(webpackConfig as webpack.Configuration), {}).listen(
      '8080',
      'localhost',
      function(err: Error | null) {
        if (err) return reject(err)
        console.log('webpack-dev-server', `http://localhost:${PORT}/`)
        resolve()
      }
    )
  })
}

runWebpack()
