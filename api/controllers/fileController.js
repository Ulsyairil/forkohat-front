import { request, response } from 'express'
import errorFileHandler from '../middleware/errorFileHandler.js'
import axios from 'axios'
import errorHandler from '../middleware/errorHandler.js'

export const getFile = async (req = request, res = response, next) => {
  try {
    let mime = req.body.mime
    let filename = req.body.filename

    if (!mime) {
      return res.status(422).json({ message: 'Missing mime' })
    }

    if (!filename) {
      return res.status(422).json({ message: 'Missing filename' })
    }

    // Get first response to detect error
    await axios.get(`/file/${mime}/${filename}`)

    // Get second response with type arraybuffer
    const response = await axios.get(`/file/${mime}/${filename}`, {
      responseType: 'arraybuffer',
    })

    // Convert to base64
    let file = Buffer.from(response.data, 'base64')

    res
      .status(200)
      .setHeader('Content-Type', response.headers['content-type'])
      .setHeader('Content-Length', response.headers['content-length'])
      .send(file)
  } catch (error) {
    if (error.response.status >= 422) {
      return errorHandler(error, req, res, next)
    }

    errorFileHandler(error, req, res, next)
  }
}
