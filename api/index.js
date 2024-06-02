import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import expressFormData from 'express-form-data'
import cors from 'cors'
import axios from 'axios'
import winston from 'winston'
import expressWinston from 'express-winston'

// Import all routes
import authRoute from './routes/auth.js'
import superadminNewsRoute from './routes/superadmin/news.js'
import fileRoute from './routes/file.js'
import superadminFAQRoute from './routes/superadmin/faq.js'
import superadminProgramRoute from './routes/superadmin/program.js'
import xResourceRoute from './routes/superadmin/x-resource.js'
import superadminEventRoute from './routes/superadmin/event.js'
import superadminGallery from './routes/superadmin/gallery.js'

// Disable console log for production
if (process.env.NODE_ENV !== 'development') {
  console.log = function () {}
}

const url = 'http://127.0.0.1:3333/api/v1' // Change this if you have another host
axios.defaults.baseURL = url

// Init section
const app = express()
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressFormData.parse())
app.disable('x-powered-by')

// express-winston logger makes sense BEFORE the router
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: './logs/api/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: './logs/api/combined.log' }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false
    }, // optional: allows to skip some log messages based on request and/or response
  })
)

// List all route
app.use(authRoute)
app.use(fileRoute)
app.use(superadminNewsRoute)
app.use(superadminFAQRoute)
app.use(superadminProgramRoute)
app.use(superadminEventRoute)
app.use(superadminGallery)

// Route X-Resource
app.use(xResourceRoute)

export default {
  path: '/api',
  handler: app,
  url: url,
}
