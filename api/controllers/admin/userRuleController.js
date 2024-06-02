import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../../middleware/errorHandler.js'

export const userRuleList = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.post(
      '/admin/rules',
      {
        page: req.body.page,
        limit: req.body.limit,
        order: req.body.order,
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

export const getUserRule = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/admin/rule', {
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

export const createUserRule = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.post(
      '/admin/rule',
      {
        rule: req.body.rule,
        is_admin: req.body.is_admin,
        is_admin: req.body.is_admin,
        is_member: req.body.is_member,
        is_guest: req.body.is_guest,
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

export const editUserRule = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.put(
      '/admin/rule',
      {
        id: req.body.id,
        rule: req.body.rule,
        is_admin: req.body.is_admin,
        is_admin: req.body.is_admin,
        is_member: req.body.is_member,
        is_guest: req.body.is_guest,
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

export const deleteUserRule = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.delete('/admin/rule', {
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
