import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../../middleware/errorHandler.js'
import formData from 'form-data'
import fs from 'fs'

export const listEventFiles = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.post(
      '/superadmin/event/file',
      {
        event_id: req.body.event_id,
        page: req.body.page,
        limit: req.body.limit,
        order: req.body.order,
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

export const getEventFile = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/superadmin/event/file', {
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

export const createEventFile = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    let form = new formData()
    form.append('event_id', req.body.event_id)
    form.append('title', req.body.title)
    if (req.files.file !== undefined) {
      form.append('file', fs.createReadStream(req.files.file.path))
    }
    const response = await axios.post('/superadmin/event/file/add', form, {
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

export const editEventFile = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    let form = new FormData()
    form.append('id', req.body.id)
    form.append('event_id', req.body.event_id)
    form.append('title', req.body.title)
    if (req.files.file !== undefined) {
      form.append('file', fs.createReadStream(req.files.file.path))
    }
    const response = await axios.put('/superadmin/event/file', form, {
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

export const deleteEventFile = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.delete('/superadmin/event/file', {
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
