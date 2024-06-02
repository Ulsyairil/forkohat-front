import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'
import formData from 'form-data'
import fs from 'fs'

export const listCarousel = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/carousels',
            {
                page: req.body.page,
                limit: req.body.limit,
                order: req.body.order,
                search: req.body.search
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

export const getCarousel = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.get('/superadmin/carousel', {
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

export const createCarousel = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        let form = new formData()
        form.append('title', req.body.title)
        form.append('description', req.body.description)
        form.append('showed', req.body.showed)
        if (req.files.image !== undefined) {
            form.append('image', fs.createReadStream(req.files.image.path))
        }
        const response = await axios.post('/superadmin/carousel', form, {
            headers: {
                Authorization: bearer,
            },
        })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const editCarousel = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        let form = new formData()
        form.append('id', req.body.id)
        form.append('title', req.body.title)
        form.append('description', req.body.description)
        form.append('showed', req.body.showed)
        if (req.files.image !== undefined) {
            form.append('image', fs.createReadStream(req.files.image.path))
        }
        const response = await axios.put('/superadmin/carousel', form, {
            headers: {
                Authorization: bearer,
            },
        })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}

export const deleteCarousel = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.delete('/superadmin/carousel', {
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