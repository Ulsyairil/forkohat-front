import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler'

export const login = async (req = request, res = response, next) => {
  try {
    const response = await axios.post('/login', {
      select: req.body.select,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })

    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const register = async (req = request, res = response, next) => {
  try {
    const response = await axios.post('/register', {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })

    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}