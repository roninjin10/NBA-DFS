import webpack from 'webpack'
import { webpackConfig } from '../webpack'

const PORT = '8080'

webpack(webpackConfig).run(function(err, stats) {
  if (err) {
    throw err
  }
  console.log('build successful', stats.toString({ colors: true }))
})
