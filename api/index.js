import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import expressFormData from 'express-form-data'
import cors from 'cors'
import authRoute from './routes/auth'
import axios from 'axios'

// Disable console log for production
if (process.env.NODE_ENV !== 'development') {
  console.log = function () {}
}

const url = "http://127.0.0.1:3333/api/v1" // Change this if you have another host
axios.defaults.baseURL = url

// Init section
const app = express()
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressFormData.parse())

// List all route
app.use([
  authRoute
])

export const path = '/api'
export const handler = app
