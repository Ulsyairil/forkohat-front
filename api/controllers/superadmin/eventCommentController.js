import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'

export const listEventComments = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/event/comments',
            {
                event_id: req.body.event_id,
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

export const getEventComment = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.get('/superadmin/event/comment', {
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

export const createEventComment = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/event/comment/create', 
        {
            event_id: req.body.event_id,
            comment: req.body.comment
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

export const editEventComment = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.put('/superadmin/event/comment/edit', 
        {
            id: req.body.id,
            event_id: req.body.event_id,
            comment: req.body.comment
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

export const deleteEventComment = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.delete('/superadmin/event/comment', 
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