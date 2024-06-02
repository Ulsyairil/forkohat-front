import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'
import formData from 'form-data'
import fs from 'fs'

export const listStructureItem = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/arrangement/items',
            {
                arrangement_id: req.body.arrangement_id,
                page: req.body.page,
                limit: req.body.limit,
                order: req.body.order,
                search: req.body.search,
                showed: req.body.showed
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

export const getStructureItem = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.get('/superadmin/arrangement/item', {
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

export const createStructureItem = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        let form = new formData()
        form.append('arrangement_id', req.body.arrangement_id)
        form.append('title', req.body.title)
        form.append('description', req.body.description)
        form.append('showed', req.body.showed)
        if (req.files.file !== undefined) {
            form.append('file', fs.createReadStream(req.files.file.path))
        }
        const response = await axios.post(
            '/superadmin/arrangement/item',
            form,
            {
                headers: {
                    Authorization: bearer,
                    ...form.getHeaders(),
                },
            }
        )
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const editStructureItem = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        let form = new formData()
        form.append('id', req.body.id)
        form.append('arrangement_id', req.body.arrangement_id)
        form.append('title', req.body.title)
        form.append('description', req.body.description)
        form.append('showed', req.body.showed)
        if (req.files.file !== undefined) {
            form.append('file', fs.createReadStream(req.files.file.path))
        }
        const response = await axios.put(
            '/superadmin/arrangement/item',
            form,
            {
                headers: {
                    Authorization: bearer,
                    ...form.getHeaders(),
                },
            }
        )
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const deleteStructureItem = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.put('/superadmin/arrangement/item/dump',
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

export const restoreStructureItem = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.put('/superadmin/arrangement/item/restore',
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

export const destroyStructureItem = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.delete('/superadmin/arrangement/item',
            {
                data: {
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