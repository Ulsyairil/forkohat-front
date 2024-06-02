import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'
import FromData from 'form-data'

export const structureList = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/arrangements', 
        {
            program_id: req.body.program_id,
            page: req.body.page,
            limit: req.body.limit,
            order: req.body.order,
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

export const getStructure = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.get('/superadmin/arrangement', {
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

export const createStructure = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        let form = new FromData()
        form.append('program_id', req.body.program_id)
        form.append('title', req.body.title)
        form.append('description', req.body.description)
        if (req.files.image !== undefined) {
            form.append('image', fs.createReadStream(req.files.image.path))
        }
        const response = await axios.post(
            '/superadmin/arrangement',
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

export const editStructure = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        let form = new FromData()
        form.append('id', req.body.id)
        form.append('program_id', req.body.program_id)
        form.append('title', req.body.title)
        form.append('description', req.body.description)
        if (req.files.image !== undefined) {
            form.append('image', fs.createReadStream(req.files.image.path))
        }
        const response = await axios.put(
            '/superadmin/arrangement',
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

export const destroyStructure = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.delete(
            '/superadmin/arrangement',
            {
                data: {
                    id: req.body.id,
                },
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