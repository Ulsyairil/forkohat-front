import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'
import FromData from 'form-data'

export const programList = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post(
            '/superadmin/programs',
            {
                page: req.body.page,
                limit: req.body.limit,
                order: req.body.order,
            },
            {
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

export const getProgram = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.get('/superadmin/program', {
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

export const createProgram = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        let form = new FromData()
        form.append('title', req.body.title)
        form.append('description', req.body.description)
        if (req.files.image !== undefined) {
            form.append('image', fs.createReadStream(req.files.image.path))
        }
        const response = await axios.post(
            '/superadmin/program',
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

export const editProgram = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        let form = new FromData()
        form.append('id', req.body.id)
        form.append('title', req.body.title)
        form.append('description', req.body.description)
        if (req.files.image !== undefined) {
            form.append('image', fs.createReadStream(req.files.image.path))
        }
        const response = await axios.put(
            '/superadmin/program',
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

export const destroyProgram = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.delete(
            '/superadmin/program',
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