const express = require('express')
const chalk = require('chalk')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const compiler = webpack(require('../webpack.config.js'))
const app = express()

// This function makes server rendering of asset references consistent with different webpack chunk/entry configurations
function normalizeAssets (assets) {
  return Array.isArray(assets) ? assets : [assets]
}

app.use(middleware(compiler, { serverSideRender: true }))

// The following middleware would not be invoked until the latest build is finished.
app.use((req, res) => {
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName

  // then use `assetsByChunkName` for server-sider rendering
  // For example, if you have only one main chunk:
  res.send(
    `<html>
      <head>
        <title>Test: alchemize</title>
      </head>
      <body>
        <div id="root"></div>
        ${normalizeAssets(assetsByChunkName.main)
          .filter(path => path.endsWith('.js'))
          .map(path => `<script src="${path}"></script>`)
          .join('\n')
        }
        <script src="https://cdnjs.cloudflare.com/ajax/libs/cash/2.1.7/cash.min.js"></script>
      </body>
    </html>`
  )
})

let port = 4444
const index = Math.max(process.argv.indexOf('--port'), process.argv.indexOf('-p'))
if (index !== -1) {
  port = +process.argv[index + 1] || port
}

app.listen(port)
console.log(`Server started at ${chalk.green(`http://localhost:${port}/`)}`)
