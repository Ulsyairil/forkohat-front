import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'

export const permissionList = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/rule/permissions',
            {
                rule_id: req.body.rule_id,
                page: req.body.page,
                limit: req.body.limit,
                order: req.body.order,
            }
            , {
                headers: {
                    Authorization: bearer,
                },
            })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const createPermission = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/rule/permission', {
            rule_id: req.body.rule_id,
            program_id: req.body.program_id,
            arrangement_id: req.body.arrangement_id,
        }, {
            headers: {
                Authorization: bearer,
            },
        })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const editPermission = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.put('/superadmin/rule/permission', {
            id: req.body.id,
            rule_id: req.body.rule_id,
            program_id: req.body.program_id,
            arrangement_id: req.body.arrangement_id,
        }, {
            headers: {
                Authorization: bearer,
            },
        })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const deletePermission = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.delete('/superadmin/rule/permission', {
            params: {
                id: req.query.id
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