import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import expressFormData from 'express-form-data'
import cors from 'cors'
import axios from 'axios'
import winston from 'winston'
import expressWinston from 'express-winston'
import expressRateLimit from 'express-rate-limit'

// Import all custom middleware
import getSecretKey from './middleware/getSecretKey.js'

// Import all routes
import authRoute from './routes/auth.js'
import fileRoute from './routes/file.js'
import superadminNewsRoute from './routes/superadmin/news.js'
import superadminFAQRoute from './routes/superadmin/faq.js'
import superadminProgramRoute from './routes/superadmin/program.js'
import superadminXResource from './routes/superadmin/x-resource.js'
import superadminEventRoute from './routes/superadmin/event.js'
import superadminGallery from './routes/superadmin/gallery.js'
import superadminCarousel from './routes/superadmin/carousel.js'
import superadminUser from './routes/superadmin/user.js'
import superadminOrgStructure from './routes/superadmin/org-structure.js'
import adminNewsRoute from './routes/admin/news.js'
import adminFAQRoute from './routes/admin/faq.js'
import adminProgramRoute from './routes/admin/program.js'
import adminXResource from './routes/admin/x-resource.js'
import adminEventRoute from './routes/admin/event.js'
import adminGallery from './routes/admin/gallery.js'
import adminCarousel from './routes/admin/carousel.js'
import adminUser from './routes/admin/user.js'
import adminOrgStructure from './routes/admin/org-structure.js'

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

const rateLimit = expressRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later!',
})
app.use(rateLimit)

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
    format: winston.format.combine(winston.format.colorize(), winston.format.json(), winston.format.prettyPrint()),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false
    }, // optional: allows to skip some log messages based on request and/or response
  }),
)

app.use(getSecretKey)

// List all route
app.use(authRoute)
app.use(fileRoute)

// List all superadmin route
app.use(superadminNewsRoute)
app.use(superadminFAQRoute)
app.use(superadminProgramRoute)
app.use(superadminEventRoute)
app.use(superadminGallery)
app.use(superadminCarousel)
app.use(superadminUser)
app.use(superadminOrgStructure)

// List all admin route
app.use(adminNewsRoute)
app.use(adminFAQRoute)
app.use(adminProgramRoute)
app.use(adminEventRoute)
app.use(adminGallery)
app.use(adminCarousel)
app.use(adminUser)
app.use(adminOrgStructure)

// Route X-Resource
app.use(superadminXResource)
app.use(adminXResource)

export default {
  path: '/api',
  handler: app,
  url: url,
}
