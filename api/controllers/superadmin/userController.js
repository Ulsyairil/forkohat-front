import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'
import FromData from 'form-data'

export const userList = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/user',
            {
                page: req.body.page,
                limit: req.body.limit,
                order: req.body.order,
                search: req.body.search,
                trash: req.body.trash,
            },
            {
                headers: {
                    Authorization: bearer,
                },
            })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const getUser = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.get('/superadmin/user', {
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

export const createUser = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/user',
            {
                rule_id: req.body.rule_id,
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
            {
                headers: {
                    Authorization: bearer,
                },
            })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const editUser = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.put('/superadmin/user',
            {
                id: req.body.id,
                rule_id: req.body.rule_id,
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
            {
                headers: {
                    Authorization: bearer,
                },
            })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const editPasswordUser = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.put('/superadmin/user/password',
            {
                user_id: req.body.user_id,
                password: req.body.password,
                confirm_password: req.body.confirm_password,
            },
            {
                headers: {
                    Authorization: bearer,
                },
            })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const deleteUser = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.put('/superadmin/user/dump',
            {
                id: req.body.id,
            },
            {
                headers: {
                    Authorization: bearer,
                },
            })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const restoreUser = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.put('/superadmin/user/restore', 
        {
            id: req.body.id
        },
        {
            headers: {
                Authorization: bearer,
            },
        })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const destroyUser = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.delete('/superadmin/user', 
        {
            params: {
                id: req.body.id
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