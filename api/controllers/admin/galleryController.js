import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../../middleware/errorHandler.js'
import formData from 'form-data'

export const listGallery = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.post(
      '/admin/galleries',
      {
        page: req.body.page,
        limit: req.body.limit,
        order: req.body.order,
        showed: req.body.showed,
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

export const createGallery = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    let form = new formData()
    form.append('title', req.body.title)
    form.append('showed', req.body.showed)
    if (req.files.image !== undefined) {
      form.append('image', fs.createReadStream(req.files.image.path))
    }
    const response = await axios.post('/admin/gallery', form, {
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

export const editGallery = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    let form = new formData()
    form.append('id', req.body.id)
    form.append('title', req.body.title)
    form.append('showed', req.body.showed)
    if (req.files.image !== undefined) {
      form.append('image', fs.createReadStream(req.files.image.path))
    }
    const response = await axios.put('/admin/gallery', form, {
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

export const deleteGallery = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.delete('/admin/gallery', {
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
