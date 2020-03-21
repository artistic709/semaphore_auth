const express = require('express')
const Bundler = require('parcel-bundler')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

const entryFile = path.join(__dirname, './index.html')

const parcelOptions = {
  // provide parcel options here
  // these are directly passed into the
  // parcel bundler
  //
  // More info on supported options are documented at
  // https://parceljs.org/api
  https: false,
  autoinstall: false
}

const app = express()

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5566',
    pathRewrite: { '^/api': '' },
    changeOrigin: true
  })
)

const bundler = new Bundler(entryFile, parcelOptions)
bundler.on('buildEnd', () => {
  console.log('Build completed!')
})

app.use(bundler.middleware())

// start up the server
app.listen(3000, () => {
  console.log('Parcel proxy server has started')
})
