import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../../middleware/errorHandler.js'
import fs from 'fs'
import FormData from 'form-data'

export const newsList = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.post(
      '/superadmin/news',
      {
        page: req.body.page,
        limit: req.body.limit,
        order: req.body.order,
        trash: req.body.trash,
        search: req.body.search,
      },
      {
        headers: {
          Authorization: bearer,
        },
      }
    )
    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const getNews = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/superadmin/news', {
      params: {
        id: req.query.id,
      },
      headers: {
        Authorization: bearer,
      },
    })
    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const createNews = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    let formData = new FormData()
    formData.append('title', req.body.title)
    formData.append('content', req.body.content)
    formData.append('image', fs.createReadStream(req.files.image.path))

    const response = await axios.post('/superadmin/news/add', formData, {
      headers: {
        Authorization: bearer,
        ...formData.getHeaders(),
      },
    })

    res.status(200).json(response.data)
  } catch (error) {
    console.log(error)
    errorHandler(error, req, res, next)
  }
}

export const updateNews = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    let formData = new FormData()
    formData.append('id', req.body.id)
    formData.append('title', req.body.title)
    formData.append('content', req.body.content)
    if (req.files.image !== undefined) {
      req.files.image.size !== 0 ??
        formData.append('image', fs.createReadStream(req.files.image.path))
    }

    const response = await axios.put('/superadmin/news', formData, {
      headers: {
        Authorization: bearer,
        ...formData.getHeaders(),
      },
    })

    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const deleteNews = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.delete('/superadmin/news', {
      data: {
        id: req.query.id,
      },
      headers: {
        Authorization: bearer,
      },
    })
    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}