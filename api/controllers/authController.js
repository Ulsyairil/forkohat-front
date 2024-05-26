import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'

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

export const user = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization')
    const response = await axios.get('/me', {
      headers: {
        Authorization: bearer,
      },
    })

    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const refreshToken = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization')
    const payload = {
      refresh_token: req.body.refresh_token,
    }
    const response = await axios.post('/refresh-token', payload, {
      headers: { Authorization: bearer },
    })

    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const logout = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization')
    const response = await axios.post(
      '/logout',
      {},
      { headers: { Authorization: bearer } }
    )

    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}