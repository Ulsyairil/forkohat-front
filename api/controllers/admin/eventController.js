import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../../middleware/errorHandler.js'
import formData from 'form-data'
import fs from 'fs'

export const listEvents = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.post(
      '/admin/events',
      {
        arrangement_id: req.body.arrangement_id,
        page: req.body.page,
        limit: req.body.limit,
        order: req.body.order,
        search: req.body.search,
        trash: req.body.trash,
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

export const getEvent = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/admin/event', {
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

export const createEvent = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    let form = new formData()
    form.append('arrangement_id', req.body.arrangement_id)
    form.append('title', req.body.title)
    form.append('description', req.body.description)
    form.append('registration_date', req.body.registration_date)
    form.append('end_registration_date', req.body.end_registration_date)
    form.append('registration_url', req.body.registration_url)
    form.append('showed', req.body.showed)
    if (req.files.image !== undefined) {
      form.append('image', fs.createReadStream(req.files.image.path))
    }
    const response = await axios.post('/admin/event', form, {
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

export const editEvent = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    let form = new formData()
    form.append('id', req.body.id)
    form.append('arrangement_id', req.body.arrangement_id)
    form.append('title', req.body.title)
    form.append('description', req.body.description)
    form.append('registration_date', req.body.registration_date)
    form.append('end_registration_date', req.body.end_registration_date)
    form.append('registration_url', req.body.registration_url)
    form.append('showed', req.body.showed)
    if (req.files.image !== undefined) {
      form.append('image', fs.createReadStream(req.files.image.path))
    }
    const response = await axios.put('/admin/event', form, {
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

export const deleteEvent = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.put(
      '/admin/event/dump',
      {
        id: req.body.id,
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

export const restoreEvent = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.put(
      '/admin/event/restore',
      {
        id: req.body.id,
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

export const destroyEvent = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.delete('/admin/event', {
      data: {
        id: req.body.id,
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
