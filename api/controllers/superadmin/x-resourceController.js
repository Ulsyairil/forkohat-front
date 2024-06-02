import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'

export const listAllPrograms = async (req = request, res = response, next) => {
    try {
        const bearer = req.get('authorization') ?? ''
        const response = await axios.post('/superadmin/programs', {
            headers: {
                Authorization: bearer,
            },
        })
        res.status(200).json(response.data)
    } catch (error) {
        errorHandler(error, req, res, next)
    }
}