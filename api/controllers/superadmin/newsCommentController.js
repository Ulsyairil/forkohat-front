import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'

export const newsCommentList = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post(
            '/superadmin/news/comments',
            {
                news_id: req.body.news_id,
                page: req.body.page,
                limit: req.body.limit,
                order: req.body.order,
                search: req.body.search,
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

export const getNewsComment = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.get(
            '/superadmin/news/comment',
            {
                params: {
                    id: req.query.id,
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

export const newsCommentCreate = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post(
            '/superadmin/news/comment',
            {
                news_id: req.body.news_id,
                comment: req.body.comment,
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

export const newsCommentEdit = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.put(
            '/superadmin/news/comment',
            {
                id: req.body.id,
                news_id: req.body.news_id,
                comment: req.body.comment,
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

export const newsCommentDestroy = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.delete(
            '/superadmin/news/comment',
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