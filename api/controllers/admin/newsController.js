import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../../middleware/errorHandler.js'
import formData from 'form-data'
import fs from 'fs'

export const newsList = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.post(
      '/admin/news',
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
      },
    )
    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const getNews = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/admin/news', {
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
    let form = new formData()
    form.append('title', req.body.title)
    form.append('content', req.body.content)
    form.append('image', fs.createReadStream(req.files.image.path))

    const response = await axios.post('/admin/news/add', form, {
      headers: {
        Authorization: bearer,
        ...form.getHeaders(),
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
    let form = new formData()
    form.append('id', req.body.id)
    form.append('title', req.body.title)
    form.append('content', req.body.content)
    if (req.files.image !== undefined) {
      req.files.image.size !== 0 ?? form.append('image', fs.createReadStream(req.files.image.path))
    }

    const response = await axios.put('/admin/news', form, {
      headers: {
        Authorization: bearer,
        ...form.getHeaders(),
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
    const response = await axios.delete('/admin/news', {
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
