const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routersPath = path.join(__dirname, 'routes')

fs.readdirSync(routersPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const routerModule = require(`./routes/${file}`)
    const router = routerModule
    app.use(router)
  }
})

app.use(function (req, res, next, err) {
  res.status(err.status || 500).json({status: err.status, message: err.message})
})

module.exports = {
  path: '/api',
  handler: app,
}
