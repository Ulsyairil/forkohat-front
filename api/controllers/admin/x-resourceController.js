import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../../middleware/errorHandler.js'

export const listAllPrograms = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/admin/programs', {
      headers: {
        Authorization: bearer,
      },
    })
    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const listAllStructure = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/admin/arrangements', {
      params: {
        program_id: req.query.program_id,
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

export const listAllUsers = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/admin/users', {
      headers: {
        Authorization: bearer,
      },
    })
    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const listAllRules = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/admin/rules', {
      headers: {
        Authorization: bearer,
      },
    })
    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}

export const listAllPermissions = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/admin/rule/permissions', {
      params: {
        rule_id: req.query.rule_id,
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

export const listAllOrgStructure = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization') ?? ''
    const response = await axios.get('/admin/orgs', {
      headers: {
        Authorization: bearer,
      },
    })
    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}
